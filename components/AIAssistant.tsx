"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PersonIcon } from "@radix-ui/react-icons";

type LeadStage = "initial" | "qualification" | "calculation" | "capture";

type ProjectionData = {
  systemSizeKW: number;
  estimatedSystemCost: number;
  subsidyAmount: number;
  effectiveCost: number;
  totalSavings: number;
  netProfit: number;
  paybackYears: number;
};

type ApiCalculationResponse = {
  type: "calculation";
  data: ProjectionData;
  nextStep?: string;
};

type ApiSchemeResponse = {
  type: "scheme_info";
  data: string;
  nextStep?: string;
};

type ApiLeadCapturedResponse = {
  type: "lead_captured";
  message: string;
  leadCategory: "high" | "medium" | "low";
};

type ApiAIResponse = {
  type: "ai_response";
  data: string;
  nextStep?: string;
};

type ApiErrorResponse = {
  error: string;
};

type ChatApiResponse =
  | ApiCalculationResponse
  | ApiSchemeResponse
  | ApiLeadCapturedResponse
  | ApiAIResponse
  | ApiErrorResponse;

type UserMessage = {
  id: string;
  role: "user";
  text: string;
};

type AssistantTextMessage = {
  id: string;
  role: "assistant";
  kind: "text";
  text: string;
  showQuickActions?: boolean;
};

type AssistantCalculationMessage = {
  id: string;
  role: "assistant";
  kind: "calculation";
  projection: ProjectionData;
};

type AssistantSchemeMessage = {
  id: string;
  role: "assistant";
  kind: "scheme";
  text: string;
};

type AssistantLeadCapturedMessage = {
  id: string;
  role: "assistant";
  kind: "lead_captured";
  text: string;
  category: "high" | "medium" | "low";
};

type AssistantMessage =
  | AssistantTextMessage
  | AssistantCalculationMessage
  | AssistantSchemeMessage
  | AssistantLeadCapturedMessage;

type ChatMessage = UserMessage | AssistantMessage;

const QUICK_ACTIONS = [
  "Calculate My Savings",
  "Subsidy in My State",
  "Talk to Solar Expert",
] as const;

const STAGE_LABELS: Record<LeadStage, string> = {
  initial: "Qualification",
  qualification: "Qualification",
  calculation: "Calculation",
  capture: "Lead Capture",
};

const BILL_REGEX = /(?:₹|rs\.?|inr)?\s*([1-9]\d{2,6}(?:,\d{2,3})*(?:\.\d+)?)/i;

function formatINR(value: number): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

function parseBillFromText(message: string): number | undefined {
  const match = message.match(BILL_REGEX);
  if (!match?.[1]) {
    return undefined;
  }
  const parsed = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function mapNextStepToLeadStage(nextStep?: string): LeadStage | null {
  if (!nextStep) {
    return null;
  }
  if (nextStep === "qualification") {
    return "qualification";
  }
  if (nextStep === "ask_for_contact") {
    return "capture";
  }
  if (nextStep === "ask_for_bill") {
    return "initial";
  }
  return null;
}

function isApiErrorResponse(payload: ChatApiResponse): payload is ApiErrorResponse {
  return typeof payload === "object" && payload !== null && "error" in payload;
}

function messageId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type FloatingTriggerProps = {
  onOpen: () => void;
};

function FloatingTrigger({ onOpen }: FloatingTriggerProps) {
  return (
    <div className="group fixed bottom-6 right-6 z-50">
      <div className="pointer-events-none absolute -inset-2 rounded-full bg-accent/35 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background shadow-xl"
        aria-label="Solar AI Advisor"
      >
        <Bot className="h-8 w-8" />
        <span className="absolute -right-0.5 -top-0.5 rounded-full border border-background bg-accent p-1 text-primary">
          <MessageCircle className="h-3.5 w-3.5" />
        </span>
      </motion.button>
      <div className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition duration-200 group-hover:opacity-100 md:block">
        Solar AI Advisor
      </div>
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string;
  valueClassName?: string;
};

function Metric({ label, value, valueClassName }: MetricProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 text-sm font-semibold text-foreground ${valueClassName ?? ""}`}>{value}</p>
    </div>
  );
}

type ProjectionCardProps = {
  projection: ProjectionData;
};

function ProjectionCard({ projection }: ProjectionCardProps) {
  return (
    <Card className="w-full rounded-2xl border border-border shadow-sm hover:translate-y-0">
      <CardContent className="space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Your Solar Savings Projection</p>
          <p className="text-xs text-muted">Estimated over 10 years</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Metric label="System Size" value={`${projection.systemSizeKW} kW`} />
            <Metric label="Estimated Cost" value={formatINR(projection.estimatedSystemCost)} />
            <Metric label="Subsidy" value={formatINR(projection.subsidyAmount)} />
          </div>
          <div className="space-y-3">
            <Metric label="Effective Cost" value={formatINR(projection.effectiveCost)} />
            <Metric label="10-Year Savings" value={formatINR(projection.totalSavings)} valueClassName="text-xl font-semibold" />
            <Metric label="Payback Period" value={`${projection.paybackYears} years`} />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="text-xs text-muted">Net Profit</p>
          <p className="text-xl font-semibold text-accent">{formatINR(projection.netProfit)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

type ContactCaptureCardProps = {
  name: string;
  phone: string;
  disabled: boolean;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
};

function ContactCaptureCard({
  name,
  phone,
  disabled,
  onNameChange,
  onPhoneChange,
  onSubmit,
}: ContactCaptureCardProps) {
  return (
    <Card className="w-full rounded-2xl border border-border bg-background/95 shadow-sm hover:translate-y-0">
      <CardContent className="space-y-3 p-4">
        <p className="text-sm font-medium text-foreground">Share your contact for an expert callback</p>
        <Input
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Full name"
          disabled={disabled}
          className="h-11 rounded-xl"
        />
        <Input
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
          placeholder="Phone number"
          disabled={disabled}
          className="h-11 rounded-xl"
        />
        <Button
          type="button"
          onClick={onSubmit}
          disabled={disabled}
          className="h-11 w-full rounded-xl bg-primary text-background hover:bg-primary-hover"
        >
          Submit Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: messageId("assistant"),
      role: "assistant",
      kind: "text",
      text: "Welcome to Fujitek Solar Advisor. Share your monthly electricity bill and I will estimate your potential savings.",
      showQuickActions: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [leadStage, setLeadStage] = useState<LeadStage>("initial");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingContact, setAwaitingContact] = useState(false);
  const [knownMonthlyBill, setKnownMonthlyBill] = useState<number | undefined>(undefined);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [typingDots, setTypingDots] = useState(".");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, open, awaitingContact]);

  useEffect(() => {
    if (!isTyping) {
      return;
    }
    const interval = setInterval(() => {
      setTypingDots((prev) => (prev.length >= 3 ? "." : `${prev}.`));
    }, 350);
    return () => clearInterval(interval);
  }, [isTyping]);

  const disableInputs = isLoading;
  const stageLabel = STAGE_LABELS[leadStage];

  const quickActionMap = useMemo<Record<(typeof QUICK_ACTIONS)[number], string>>(
    () => ({
      "Calculate My Savings": "Calculate my solar savings. My monthly bill is ₹3500.",
      "Subsidy in My State": "Tell me subsidy scheme details in my state.",
      "Talk to Solar Expert": "I want to talk to a solar expert for installation.",
    }),
    []
  );

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: messageId("user"),
        role: "user",
        text,
      },
    ]);
  };

  const addAssistantText = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: messageId("assistant"),
        role: "assistant",
        kind: "text",
        text,
      },
    ]);
  };

  const sendToChatApi = async (message: string) => {
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const payload = (await response.json()) as ChatApiResponse;

      if (!response.ok || isApiErrorResponse(payload)) {
        addAssistantText("I can assist only with solar consultation. Please share your electricity bill to continue.");
        return;
      }

      if (payload.type === "calculation") {
        setLeadStage("calculation");
        setAwaitingContact(payload.nextStep === "ask_for_contact");
        setMessages((prev) => [
          ...prev,
          {
            id: messageId("assistant"),
            role: "assistant",
            kind: "calculation",
            projection: payload.data,
          },
        ]);
      }

      if (payload.type === "scheme_info") {
        const mapped = mapNextStepToLeadStage(payload.nextStep);
        if (mapped) {
          setLeadStage(mapped);
        }
        setAwaitingContact(false);
        setMessages((prev) => [
          ...prev,
          {
            id: messageId("assistant"),
            role: "assistant",
            kind: "scheme",
            text: payload.data,
          },
        ]);
      }

      if (payload.type === "lead_captured") {
        setLeadStage("capture");
        setAwaitingContact(false);
        setContactName("");
        setContactPhone("");
        setMessages((prev) => [
          ...prev,
          {
            id: messageId("assistant"),
            role: "assistant",
            kind: "lead_captured",
            text: payload.message,
            category: payload.leadCategory,
          },
        ]);
      }

      if (payload.type === "ai_response") {
        const mapped = mapNextStepToLeadStage(payload.nextStep);
        if (mapped) {
          setLeadStage(mapped);
          setAwaitingContact(payload.nextStep === "ask_for_contact");
        }
        setMessages((prev) => [
          ...prev,
          {
            id: messageId("assistant"),
            role: "assistant",
            kind: "text",
            text: payload.data,
          },
        ]);
      }
    } catch {
      addAssistantText("Service is currently busy. Please share your monthly bill and try again.");
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || disableInputs) {
      return;
    }

    const parsedBill = parseBillFromText(text);
    if (parsedBill) {
      setKnownMonthlyBill(parsedBill);
    }

    setInput("");
    addUserMessage(text);
    await sendToChatApi(text);
  };

  const handleQuickAction = (action: (typeof QUICK_ACTIONS)[number]) => {
    if (disableInputs) {
      return;
    }
    setInput(quickActionMap[action]);
  };

  const handleContactSubmit = async () => {
    if (disableInputs) {
      return;
    }

    const name = contactName.trim();
    const phone = contactPhone.trim();

    if (!name || !phone) {
      addAssistantText("Please provide both your name and phone number to schedule expert callback.");
      return;
    }

    const message = knownMonthlyBill
      ? `My name is ${name}. My phone is ${phone}. My monthly bill is ₹${knownMonthlyBill}.`
      : `My name is ${name}. My phone is ${phone}.`;

    addUserMessage(`Name: ${name}, Phone: ${phone}`);
    await sendToChatApi(message);
  };

  const onInputKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleSend();
    }
  };

  return (
    <>
      <FloatingTrigger onOpen={() => setOpen(true)} />

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px]"
          >
            <Card
              className="flex max-h-[600px] w-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xl hover:translate-y-0"
              role="dialog"
              aria-modal="true"
              aria-label="Fujitek Solar AI Advisor"
            >
              <div className="flex items-center justify-between gap-3 border-b border-border bg-primary px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <PersonIcon className="h-5 w-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white bg-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-accent font-semibold leading-tight">Sam</p>
                    <p className="text-xs text-white/90">We're online · {stageLabel}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15"
                  aria-label="Close assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="max-h-[420px] min-h-0 flex-1 space-y-3 overflow-y-auto bg-accent/90 px-4 py-3 scroll-smooth"
              >
                {messages.map((message) => {
                  if (message.role === "user") {
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[86%] rounded-2xl bg-primary px-4 py-2 text-sm text-background">
                          {message.text}
                        </div>
                      </motion.div>
                    );
                  }

                  if (message.kind === "calculation") {
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex justify-start"
                      >
                        <div className="w-full">
                          <ProjectionCard projection={message.projection} />
                        </div>
                      </motion.div>
                    );
                  }

                  if (message.kind === "scheme") {
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[90%] whitespace-pre-line rounded-2xl border border-border bg-card px-4 py-2 text-sm text-foreground">
                          {message.text}
                        </div>
                      </motion.div>
                    );
                  }

                  if (message.kind === "lead_captured") {
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[90%] rounded-2xl border border-border bg-card px-4 py-2 text-sm">
                          <p className="text-sm font-semibold text-foreground">{message.text}</p>
                          <p className="mt-1 text-xs uppercase tracking-wide text-muted">Lead category: {message.category}</p>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[90%] rounded-2xl border border-border bg-card px-4 py-2 text-sm text-foreground">
                        {message.text}
                        {message.showQuickActions ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {QUICK_ACTIONS.map((action) => (
                              <Button
                                key={action}
                                type="button"
                                variant="outline"
                                onClick={() => handleQuickAction(action)}
                                disabled={disableInputs}
                                className="h-auto rounded-full px-3 py-1 text-xs"
                              >
                                {action}
                              </Button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })}

                {isTyping ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex rounded-2xl border border-border bg-card px-4 py-2 text-sm text-muted"
                  >
                    Advisor is typing{typingDots}
                  </motion.div>
                ) : null}

                <AnimatePresence>
                  {awaitingContact ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ContactCaptureCard
                        name={contactName}
                        phone={contactPhone}
                        disabled={disableInputs}
                        onNameChange={setContactName}
                        onPhoneChange={setContactPhone}
                        onSubmit={handleContactSubmit}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {!awaitingContact ? (
                <div className="flex items-center gap-2 border-t border-border bg-accent p-3">
                  <Input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={onInputKeyDown}
                    placeholder="Ask about savings..."
                    disabled={disableInputs}
                    className="h-10 flex-1 rounded-full border border-border bg-primary px-4 text-sm"
                  />
                  <Button
                    type="button"
                    onClick={handleSend}
                    disabled={disableInputs || !input.trim()}
                    className="h-10 w-10 rounded-full bg-primary p-0 text-accent hover:bg-primary/80-hover"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
