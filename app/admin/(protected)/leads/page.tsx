"use client";

import { useEffect, useMemo, useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type LeadCategory = "high" | "medium" | "low";
type LeadStatus = "new" | "contacted" | "closed";
type FilterTab = "all" | LeadCategory | "closed";

type LeadItem = {
  id: string;
  name: string;
  phone: string;
  city?: string;
  monthlyBill?: number;
  score: number;
  category: LeadCategory;
  status: LeadStatus;
  netProfit?: number;
  createdAt: string;
};

type ApiErrorPayload = {
  message?: string;
};

const FILTER_TABS: ReadonlyArray<{ key: FilterTab; label: string }> = [
  { key: "all", label: "All" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
  { key: "closed", label: "Closed" },
];

function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function categoryBadgeClass(category: LeadCategory): string {
  if (category === "high") return "bg-emerald-100 text-emerald-700";
  if (category === "medium") return "bg-amber-100 text-amber-700";
  return "bg-slate-200 text-slate-700";
}

function getNextStatusOptions(status: LeadStatus): LeadStatus[] {
  if (status === "new") return ["new", "contacted"];
  if (status === "contacted") return ["contacted", "closed"];
  return ["closed"];
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [statusSavingId, setStatusSavingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function loadLeads() {
      try {
        setLoading(true);
        setErrorMessage("");
        const response = await fetch("/api/admin/leads", { cache: "no-store" });
        const payload = (await response.json()) as LeadItem[] | ApiErrorPayload;

        if (!response.ok) {
          const error = payload as ApiErrorPayload;
          throw new Error(error.message || "Failed to load leads.");
        }

        if (mounted) {
          setLeads(payload as LeadItem[]);
        }
      } catch (error) {
        if (mounted) {
          setLeads([]);
          setErrorMessage(error instanceof Error ? error.message : "Failed to load leads.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadLeads();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredLeads = useMemo(() => {
    if (activeTab === "all") return leads;
    if (activeTab === "closed") return leads.filter((lead) => lead.status === "closed");
    return leads.filter((lead) => lead.category === activeTab);
  }, [activeTab, leads]);

  const kpis = useMemo(() => {
    const totalLeads = leads.length;
    const high = leads.filter((lead) => lead.category === "high").length;
    const medium = leads.filter((lead) => lead.category === "medium").length;
    const low = leads.filter((lead) => lead.category === "low").length;
    const closed = leads.filter((lead) => lead.status === "closed").length;
    const projectedRevenuePotential = leads
      .filter((lead) => lead.category === "high")
      .reduce((sum, lead) => sum + (lead.netProfit ?? 0), 0);

    return {
      totalLeads,
      high,
      medium,
      low,
      closed,
      projectedRevenuePotential,
    };
  }, [leads]);

  async function updateLeadStatus(leadId: string, nextStatus: LeadStatus) {
    const previous = leads;
    setStatusSavingId(leadId);
    setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, status: nextStatus } : lead)));

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: nextStatus }),
      });
      const payload = (await response.json()) as ApiErrorPayload;

      if (!response.ok) {
        throw new Error(payload.message || "Failed to update lead status.");
      }
    } catch (error) {
      setLeads(previous);
      setErrorMessage(error instanceof Error ? error.message : "Failed to update lead status.");
    } finally {
      setStatusSavingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Leads Dashboard</h1>
          <p className="text-sm text-slate-600">Monitor lead quality, conversion progress, and revenue potential.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.04}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <AdminCard>
            <p className="text-sm text-slate-500">Total Leads</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{kpis.totalLeads}</p>
          </AdminCard>
          <AdminCard>
            <p className="text-sm text-slate-500">High Value Leads</p>
            <p className="mt-2 text-2xl font-bold text-emerald-700">{kpis.high}</p>
          </AdminCard>
          <AdminCard>
            <p className="text-sm text-slate-500">Medium Leads</p>
            <p className="mt-2 text-2xl font-bold text-amber-700">{kpis.medium}</p>
          </AdminCard>
          <AdminCard>
            <p className="text-sm text-slate-500">Low Leads</p>
            <p className="mt-2 text-2xl font-bold text-slate-700">{kpis.low}</p>
          </AdminCard>
          <AdminCard>
            <p className="text-sm text-slate-500">Closed Leads</p>
            <p className="mt-2 text-2xl font-bold text-blue-700">{kpis.closed}</p>
          </AdminCard>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <AdminCard className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <p className="text-sm font-medium text-slate-600">Projected Revenue Potential</p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-800">{formatINR(kpis.projectedRevenuePotential)}</p>
          <p className="mt-1 text-xs text-slate-600">Based on cumulative net profit from high category leads.</p>
        </AdminCard>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <AdminCard>
          <div className="mb-4 flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {errorMessage ? (
            <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
          ) : null}

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Name</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Phone</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">City</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Monthly Bill</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Score</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Category</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Status</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Created Date</th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-3 py-6 text-center text-slate-500">
                      Loading leads...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-3 py-6 text-center text-slate-500">
                      No leads found for this filter.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="odd:bg-slate-50/60">
                      <td className="border-b border-slate-100 px-3 py-2 font-medium text-slate-900">{lead.name}</td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{lead.phone}</td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{lead.city || "-"}</td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">
                        {typeof lead.monthlyBill === "number" ? formatINR(lead.monthlyBill) : "-"}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{lead.score}</td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${categoryBadgeClass(lead.category)}`}>
                          {lead.category}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{lead.status}</td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <select
                          value={lead.status}
                          disabled={statusSavingId === lead.id || lead.status === "closed"}
                          onChange={(event) => updateLeadStatus(lead.id, event.target.value as LeadStatus)}
                          className="rounded-md border border-slate-200 px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {getNextStatusOptions(lead.status).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </ScrollReveal>
    </div>
  );
}

