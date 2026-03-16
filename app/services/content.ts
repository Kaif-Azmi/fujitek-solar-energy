import type { CtaLink, FaqItem, HighlightItem, NavItem, ProcessStep } from "@/components/services/types";
import type { Locale } from "@/lib/i18n";

export type ServiceSectionContent = {
  id: string;
  title: string;
  mainDescription: string;
  featureTitle: string;
  features: { title: string; description: string; icon: "grid" | "shield" | "chart" }[];
  highlightTitle: string;
  highlightDescription: string;
  highlightItems: HighlightItem[];
  detailParagraphs: string[];
};

type HeroContent = {
  title: string;
  intro: string;
  ctas: [CtaLink, CtaLink, CtaLink];
  companyLabel: string;
  audienceTags: [string, string, string];
  asideTitle: string;
  asideItems: [string, string, string, string];
};

type ServicesContentBundle = {
  heroContent: HeroContent;
  sectionNavItems: NavItem[];
  trustMetrics: { value: string; label: string }[];
  processSteps: ProcessStep[];
  serviceSections: ServiceSectionContent[];
  faqs: FaqItem[];
  serviceOverview: {
    label: string;
    description: string;
  };
  inverterFooter: {
    prefix: string;
    linkLabel: string;
    suffix: string;
  };
  sectionCta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
  executionModel: {
    label: string;
    title: string;
    description: string;
  };
  faqHeading: string;
  finalCta: {
    heading: string;
    supportingText: string;
    ctaLabel: string;
    ariaLabel: string;
    benefits: [string, string, string, string, string];
  };
  mobileCtaLabel: string;
};

const EN_CONTENT: ServicesContentBundle = {
  heroContent: {
    title: "Solar & EV Power Electronics Manufacturing",
    intro:
      "Fujitek Solar Energy manufactures high-performance solar inverters, solar panels, lithium chargers, smart PWM charge controllers, and EV charging equipment for dealers, distributors, OEM partners, and institutional buyers across India. Our engineering focuses on efficiency, grid stability, durability, and scalable production capability.",
    ctas: [
      { label: "Explore Products", href: "/products" },
      { label: "Request Bulk Pricing", href: "/contact" },
      { label: "Become a Dealer", href: "/contact" },
    ],
    companyLabel: "Fujitek Solar Energy Pvt. Ltd.",
    audienceTags: ["Dealers", "OEM Partners", "Bulk Supply"],
    asideTitle: "Why Businesses Choose Fujitek",
    asideItems: [
      "High-efficiency power electronics with tested reliability.",
      "Scalable supply for distributors, dealers, and institutions.",
      "Technical guidance for product selection and project fitment.",
      "Supportive post-order communication for smoother execution.",
    ],
  },
  sectionNavItems: [
    { id: "solar-inverters", label: "Inverters" },
    { id: "solar-panels", label: "Solar Panels" },
    { id: "ev-chargers", label: "EV Chargers" },
    { id: "charge-controllers", label: "Charge Controllers" },
    { id: "oem-bulk-supply", label: "OEM Supply" },
    { id: "process", label: "Process" },
    { id: "faqs", label: "FAQs" },
  ],
  trustMetrics: [
    { value: "High", label: "Conversion efficiency across inverter range" },
    { value: "OEM", label: "Bulk manufacturing & dealer supply capability" },
    { value: "Tested", label: "Quality-controlled production standards" },
    { value: "Pan India", label: "Distribution-ready product supply" },
  ],
  processSteps: [
    {
      title: "Requirement Discovery",
      description: "We capture your project load profile, target use-case, and supply volume needs.",
    },
    {
      title: "Technical Mapping",
      description: "Our team aligns inverter, panel, charger, and controller options to your deployment scope.",
    },
    {
      title: "Commercial Structuring",
      description: "You receive clear pricing, dealer/OEM terms, and supply timelines for execution planning.",
    },
    {
      title: "Fulfillment & Support",
      description: "Orders are dispatched through a structured supply process with post-order technical assistance.",
    },
  ],
  serviceSections: [
    {
      id: "solar-inverters",
      title: "On-Grid, Off-Grid & Hybrid Inverters",
      mainDescription:
        "Fujitek manufactures on-grid, off-grid, and hybrid solar inverters engineered for Indian voltage conditions, high-temperature operation, and long-term reliability. Our inverter architecture focuses on stable conversion efficiency, protection coordination, and monitoring compatibility.",
      featureTitle: "Inverter Engineering Focus",
      features: [
        {
          title: "On-Grid Inverters",
          description:
            "Designed for grid-synchronized systems focused on bill reduction and export-ready compatibility.",
          icon: "grid",
        },
        {
          title: "Hybrid Inverters",
          description: "Battery-ready systems with backup logic and scalable expansion capability.",
          icon: "chart",
        },
        {
          title: "Protection & Stability",
          description:
            "Engineered with voltage tolerance, surge protection compatibility, and operational safety controls.",
          icon: "shield",
        },
      ],
      highlightTitle: "Inverter Product Highlights",
      highlightDescription: "Reliable conversion and scalable architecture.",
      highlightItems: [
        { label: "Types", value: "On-grid, Off-grid, Hybrid" },
        { label: "Efficiency", value: "High conversion performance under load" },
        { label: "Monitoring", value: "Dashboard-ready models available" },
        { label: "Application", value: "Residential & Commercial compatibility" },
      ],
      detailParagraphs: [
        "Our inverter range is designed for dealers and system integrators looking for reliable power electronics built for Indian grid realities.",
      ],
    },
    {
      id: "solar-panels",
      title: "Solar Panels & Module Supply",
      mainDescription:
        "We supply high-efficiency solar panels aligned with performance and durability expectations for residential and commercial systems.",
      featureTitle: "Panel Focus",
      features: [
        { title: "High Output Modules", description: "Optimized for yield and durability.", icon: "chart" },
        { title: "Warranty Alignment", description: "Manufacturer-backed coverage.", icon: "shield" },
        { title: "Scalable Supply", description: "Bulk-ready distribution capability.", icon: "grid" },
      ],
      highlightTitle: "Panel Capabilities",
      highlightDescription: "Built for long operational life.",
      highlightItems: [
        { label: "Usage", value: "Residential & Commercial" },
        { label: "Durability", value: "Long-term performance stability" },
        { label: "Compatibility", value: "Works with on-grid & hybrid systems" },
        { label: "Supply Model", value: "Dealer & OEM ready" },
      ],
      detailParagraphs: [
        "Our panel supply supports distributors and system partners looking for consistent product availability.",
      ],
    },
    {
      id: "ev-chargers",
      title: "EV Chargers & Lithium Vehicle Chargers",
      mainDescription:
        "Fujitek manufactures EV charging equipment including lithium e-rickshaw chargers and electric scooty chargers designed for safety, durability, and daily-use reliability.",
      featureTitle: "EV Charging Portfolio",
      features: [
        {
          title: "E-Rickshaw Chargers",
          description: "Lithium-compatible charging solutions for commercial electric vehicles.",
          icon: "grid",
        },
        {
          title: "Scooty Chargers",
          description: "Safe and efficient battery charging for electric two-wheelers.",
          icon: "chart",
        },
        {
          title: "Protection Standards",
          description: "Designed with electrical safety and operational stability in mind.",
          icon: "shield",
        },
      ],
      highlightTitle: "EV Charger Range",
      highlightDescription: "Reliable hardware for growing EV demand.",
      highlightItems: [
        { label: "Vehicle Types", value: "E-rickshaw & Electric Scooters" },
        { label: "Usage", value: "Dealer & commercial supply" },
        { label: "Focus", value: "Safety & battery protection" },
        { label: "Availability", value: "Bulk-ready distribution" },
      ],
      detailParagraphs: ["Our EV charging equipment supports India's expanding electric mobility ecosystem."],
    },
    {
      id: "charge-controllers",
      title: "Smart PWM Charge Controllers",
      mainDescription:
        "We manufacture low-cost smart PWM charge controllers for battery systems, designed for OEM integration and reliable off-grid usage.",
      featureTitle: "Controller Engineering",
      features: [
        { title: "Battery Protection", description: "Prevents overcharge and deep discharge.", icon: "shield" },
        { title: "Stable Charging Logic", description: "Optimized charging curves for battery life.", icon: "chart" },
        { title: "OEM Integration", description: "Designed for system builders and manufacturers.", icon: "grid" },
      ],
      highlightTitle: "Controller Advantages",
      highlightDescription: "Smart control for battery reliability.",
      highlightItems: [
        { label: "Type", value: "Smart PWM" },
        { label: "Application", value: "Off-grid & battery systems" },
        { label: "Target Market", value: "OEM & bulk buyers" },
        { label: "Design Focus", value: "Cost-efficient reliability" },
      ],
      detailParagraphs: [
        "These controllers are built for stable charging performance in off-grid and battery-based systems.",
      ],
    },
    {
      id: "oem-bulk-supply",
      title: "OEM & Bulk Supply Capability",
      mainDescription:
        "Fujitek supports distributors, dealers, and institutional buyers with structured bulk supply capability across product categories.",
      featureTitle: "Supply Strength",
      features: [
        { title: "Dealer Network Support", description: "Distribution-focused supply chain model.", icon: "grid" },
        { title: "Bulk Pricing Structure", description: "Volume-based commercial models.", icon: "chart" },
        { title: "Quality Control", description: "Production-level testing standards.", icon: "shield" },
      ],
      highlightTitle: "Business Model",
      highlightDescription: "Manufacturing-backed scalability.",
      highlightItems: [
        { label: "Supply", value: "Pan-India distribution" },
        { label: "Focus", value: "OEM & dealers" },
        { label: "Quality", value: "Structured testing workflow" },
        { label: "Scalability", value: "Bulk manufacturing ready" },
      ],
      detailParagraphs: [
        "We position ourselves as a reliable hardware manufacturing partner for India's renewable energy ecosystem.",
      ],
    },
  ],
  faqs: [
    {
      question: "Do you provide installation services?",
      answer:
        "Fujitek primarily focuses on manufacturing and product supply. Installation may be supported through partner networks.",
    },
    {
      question: "Do you support bulk or dealer orders?",
      answer: "Yes, we support OEM partnerships, dealer networks, and institutional bulk procurement.",
    },
    {
      question: "Which inverter types do you manufacture?",
      answer: "We manufacture on-grid, off-grid, and hybrid inverters for residential and commercial use.",
    },
    {
      question: "Do you manufacture EV chargers?",
      answer: "Yes, including lithium e-rickshaw chargers and electric scooty chargers.",
    },
  ],
  serviceOverview: {
    label: "Service Overview",
    description:
      "Built for long-term reliability, our services are designed to support dealers, OEM partners, and commercial buyers with practical product selection, scalable supply, and dependable technical support.",
  },
  inverterFooter: {
    prefix: "You can also explore our",
    linkLabel: "complete product portfolio",
    suffix: "for technical specifications and model comparisons.",
  },
  sectionCta: {
    title: "Looking for Bulk Orders or Dealer Partnership?",
    description: "Contact our team for structured pricing, OEM supply capability, and technical product guidance.",
    primaryLabel: "Request Bulk Pricing",
    secondaryLabel: "Become a Dealer",
  },
  executionModel: {
    label: "Execution Model",
    title: "How We Deliver Projects and Bulk Orders",
    description:
      "From technical discovery to commercial closure and fulfillment, we follow a structured workflow that keeps communication clear and delivery predictable.",
  },
  faqHeading: "Frequently Asked Questions",
  finalCta: {
    heading: "Partner with Fujitek Solar Energy",
    supportingText:
      "Reliable solar inverters, EV chargers, smart charge controllers, and power electronics built for performance and scale.",
    ctaLabel: "Contact Sales Team",
    ariaLabel: "Final call to action",
    benefits: [
      "High-efficiency product architecture",
      "Bulk supply and OEM partnership readiness",
      "Quality-controlled manufacturing standards",
      "Technical support for product selection",
      "Structured post-order communication",
    ],
  },
  mobileCtaLabel: "Request Pricing",
};

const HI_CONTENT: ServicesContentBundle = {
  heroContent: {
    title: "सोलर और ईवी पावर इलेक्ट्रॉनिक्स मैन्युफैक्चरिंग",
    intro:
      "फुजीटेक सोलर एनर्जी भारत भर में डीलर, डिस्ट्रीब्यूटर, OEM पार्टनर और संस्थागत खरीदारों के लिए हाई-परफॉर्मेंस सोलर इन्वर्टर, सोलर पैनल, लिथियम चार्जर, स्मार्ट PWM चार्ज कंट्रोलर और ईवी चार्जिंग उपकरण बनाती है। हमारी इंजीनियरिंग दक्षता, ग्रिड स्थिरता, टिकाऊपन और स्केलेबल उत्पादन क्षमता पर केंद्रित है।",
    ctas: [
      { label: "प्रोडक्ट्स देखें", href: "/products" },
      { label: "बल्क प्राइसिंग पाएं", href: "/contact" },
      { label: "डीलर बनें", href: "/contact" },
    ],
    companyLabel: "फुजीटेक सोलर एनर्जी प्राइवेट लिमिटेड",
    audienceTags: ["डीलर्स", "OEM पार्टनर्स", "बल्क सप्लाई"],
    asideTitle: "बिजनेस फुजीटेक क्यों चुनते हैं",
    asideItems: [
      "टेस्टेड विश्वसनीयता के साथ हाई-एफिशिएंसी पावर इलेक्ट्रॉनिक्स।",
      "डिस्ट्रीब्यूटर, डीलर और संस्थानों के लिए स्केलेबल सप्लाई।",
      "प्रोडक्ट चयन और प्रोजेक्ट फिटमेंट के लिए तकनीकी मार्गदर्शन।",
      "स्मूथ एग्जीक्यूशन के लिए सपोर्टिव पोस्ट-ऑर्डर कम्युनिकेशन।",
    ],
  },
  sectionNavItems: [
    { id: "solar-inverters", label: "इन्वर्टर्स" },
    { id: "solar-panels", label: "सोलर पैनल" },
    { id: "ev-chargers", label: "ईवी चार्जर्स" },
    { id: "charge-controllers", label: "चार्ज कंट्रोलर्स" },
    { id: "oem-bulk-supply", label: "OEM सप्लाई" },
    { id: "process", label: "प्रोसेस" },
    { id: "faqs", label: "अक्सर पूछे जाने वाले प्रश्न" },
  ],
  trustMetrics: [
    { value: "उच्च", label: "इन्वर्टर रेंज में कन्वर्ज़न एफिशिएंसी" },
    { value: "OEM", label: "बल्क मैन्युफैक्चरिंग और डीलर सप्लाई क्षमता" },
    { value: "टेस्टेड", label: "क्वालिटी-कंट्रोल्ड प्रोडक्शन स्टैंडर्ड" },
    { value: "पैन इंडिया", label: "डिस्ट्रीब्यूशन-रेडी प्रोडक्ट सप्लाई" },
  ],
  processSteps: [
    {
      title: "आवश्यकता विश्लेषण",
      description: "हम आपके प्रोजेक्ट लोड प्रोफाइल, उपयोग केस और सप्लाई वॉल्यूम जरूरतों को समझते हैं।",
    },
    {
      title: "तकनीकी मैपिंग",
      description: "हमारी टीम आपकी डिप्लॉयमेंट जरूरत के अनुसार इन्वर्टर, पैनल, चार्जर और कंट्रोलर विकल्प मैप करती है।",
    },
    {
      title: "कमर्शियल स्ट्रक्चरिंग",
      description: "एग्जीक्यूशन प्लानिंग के लिए आपको स्पष्ट प्राइसिंग, डीलर/OEM शर्तें और सप्लाई टाइमलाइन मिलती हैं।",
    },
    {
      title: "फुलफिलमेंट और सपोर्ट",
      description: "ऑर्डर स्ट्रक्चर्ड सप्लाई प्रोसेस से डिस्पैच किए जाते हैं और पोस्ट-ऑर्डर तकनीकी सहायता दी जाती है।",
    },
  ],
  serviceSections: [
    {
      id: "solar-inverters",
      title: "ऑन-ग्रिड, ऑफ-ग्रिड और हाइब्रिड इन्वर्टर",
      mainDescription:
        "फुजीटेक भारतीय वोल्टेज स्थितियों, हाई-टेम्परेचर ऑपरेशन और लंबे समय की विश्वसनीयता के लिए इंजीनियर्ड ऑन-ग्रिड, ऑफ-ग्रिड और हाइब्रिड सोलर इन्वर्टर बनाती है। हमारी इन्वर्टर आर्किटेक्चर स्थिर कन्वर्ज़न एफिशिएंसी, सुरक्षा समन्वय और मॉनिटरिंग कम्पैटिबिलिटी पर केंद्रित है।",
      featureTitle: "इन्वर्टर इंजीनियरिंग फोकस",
      features: [
        {
          title: "ऑन-ग्रिड इन्वर्टर",
          description: "बिल बचत और एक्सपोर्ट-रेडी कम्पैटिबिलिटी के लिए ग्रिड-सिंक सिस्टम हेतु डिज़ाइन किए गए।",
          icon: "grid",
        },
        {
          title: "हाइब्रिड इन्वर्टर",
          description: "बैटरी-रेडी सिस्टम जिनमें बैकअप लॉजिक और स्केलेबल एक्सपेंशन क्षमता होती है।",
          icon: "chart",
        },
        {
          title: "प्रोटेक्शन और स्थिरता",
          description: "वोल्टेज टॉलरेंस, सर्ज प्रोटेक्शन कम्पैटिबिलिटी और सेफ्टी कंट्रोल्स के साथ इंजीनियर्ड।",
          icon: "shield",
        },
      ],
      highlightTitle: "इन्वर्टर प्रोडक्ट हाइलाइट्स",
      highlightDescription: "विश्वसनीय कन्वर्ज़न और स्केलेबल आर्किटेक्चर।",
      highlightItems: [
        { label: "प्रकार", value: "ऑन-ग्रिड, ऑफ-ग्रिड, हाइब्रिड" },
        { label: "एफिशिएंसी", value: "लोड पर हाई कन्वर्ज़न परफॉर्मेंस" },
        { label: "मॉनिटरिंग", value: "डैशबोर्ड-रेडी मॉडल उपलब्ध" },
        { label: "उपयोग", value: "रेजिडेंशियल और कमर्शियल कम्पैटिबिलिटी" },
      ],
      detailParagraphs: [
        "हमारी इन्वर्टर रेंज उन डीलर्स और सिस्टम इंटीग्रेटर्स के लिए है जिन्हें भारतीय ग्रिड परिस्थितियों के अनुरूप विश्वसनीय पावर इलेक्ट्रॉनिक्स चाहिए।",
      ],
    },
    {
      id: "solar-panels",
      title: "सोलर पैनल और मॉड्यूल सप्लाई",
      mainDescription:
        "हम रेजिडेंशियल और कमर्शियल सिस्टम की परफॉर्मेंस और टिकाऊपन अपेक्षाओं के अनुरूप हाई-एफिशिएंसी सोलर पैनल सप्लाई करते हैं।",
      featureTitle: "पैनल फोकस",
      features: [
        { title: "हाई आउटपुट मॉड्यूल", description: "यील्ड और टिकाऊपन के लिए ऑप्टिमाइज़्ड।", icon: "chart" },
        { title: "वारंटी सपोर्ट", description: "मैन्युफैक्चरर-बैक्ड कवरेज।", icon: "shield" },
        { title: "स्केलेबल सप्लाई", description: "बल्क-रेडी डिस्ट्रीब्यूशन क्षमता।", icon: "grid" },
      ],
      highlightTitle: "पैनल क्षमताएं",
      highlightDescription: "लंबे ऑपरेशनल जीवन के लिए तैयार।",
      highlightItems: [
        { label: "उपयोग", value: "रेजिडेंशियल और कमर्शियल" },
        { label: "टिकाऊपन", value: "लंबी अवधि की परफॉर्मेंस स्थिरता" },
        { label: "कम्पैटिबिलिटी", value: "ऑन-ग्रिड और हाइब्रिड सिस्टम के साथ कार्यशील" },
        { label: "सप्लाई मॉडल", value: "डीलर और OEM रेडी" },
      ],
      detailParagraphs: [
        "हमारी पैनल सप्लाई उन डिस्ट्रीब्यूटर्स और सिस्टम पार्टनर्स का समर्थन करती है जिन्हें निरंतर प्रोडक्ट उपलब्धता चाहिए।",
      ],
    },
    {
      id: "ev-chargers",
      title: "ईवी चार्जर और लिथियम व्हीकल चार्जर",
      mainDescription:
        "फुजीटेक ईवी चार्जिंग उपकरण बनाती है जिनमें लिथियम ई-रिक्शा चार्जर और इलेक्ट्रिक स्कूटी चार्जर शामिल हैं, जो सुरक्षा, टिकाऊपन और दैनिक उपयोग की विश्वसनीयता के लिए डिज़ाइन किए गए हैं।",
      featureTitle: "ईवी चार्जिंग पोर्टफोलियो",
      features: [
        {
          title: "ई-रिक्शा चार्जर",
          description: "कमर्शियल इलेक्ट्रिक वाहनों के लिए लिथियम-कम्पैटिबल चार्जिंग समाधान।",
          icon: "grid",
        },
        {
          title: "स्कूटी चार्जर",
          description: "इलेक्ट्रिक टू-व्हीलर्स के लिए सुरक्षित और कुशल बैटरी चार्जिंग।",
          icon: "chart",
        },
        {
          title: "प्रोटेक्शन स्टैंडर्ड",
          description: "इलेक्ट्रिकल सुरक्षा और ऑपरेशनल स्थिरता को ध्यान में रखकर डिज़ाइन किए गए।",
          icon: "shield",
        },
      ],
      highlightTitle: "ईवी चार्जर रेंज",
      highlightDescription: "बढ़ती ईवी मांग के लिए विश्वसनीय हार्डवेयर।",
      highlightItems: [
        { label: "वाहन प्रकार", value: "ई-रिक्शा और इलेक्ट्रिक स्कूटर" },
        { label: "उपयोग", value: "डीलर और कमर्शियल सप्लाई" },
        { label: "फोकस", value: "सुरक्षा और बैटरी प्रोटेक्शन" },
        { label: "उपलब्धता", value: "बल्क-रेडी डिस्ट्रीब्यूशन" },
      ],
      detailParagraphs: ["हमारे ईवी चार्जिंग उपकरण भारत के बढ़ते इलेक्ट्रिक मोबिलिटी इकोसिस्टम को सपोर्ट करते हैं।"],
    },
    {
      id: "charge-controllers",
      title: "स्मार्ट PWM चार्ज कंट्रोलर",
      mainDescription:
        "हम बैटरी सिस्टम के लिए लो-कॉस्ट स्मार्ट PWM चार्ज कंट्रोलर बनाते हैं, जो OEM इंटीग्रेशन और विश्वसनीय ऑफ-ग्रिड उपयोग हेतु डिज़ाइन किए गए हैं।",
      featureTitle: "कंट्रोलर इंजीनियरिंग",
      features: [
        { title: "बैटरी प्रोटेक्शन", description: "ओवरचार्ज और डीप डिस्चार्ज से सुरक्षा।", icon: "shield" },
        { title: "स्थिर चार्जिंग लॉजिक", description: "बैटरी जीवन के लिए ऑप्टिमाइज़्ड चार्जिंग कर्व।", icon: "chart" },
        { title: "OEM इंटीग्रेशन", description: "सिस्टम बिल्डर्स और निर्माताओं के लिए डिज़ाइन।", icon: "grid" },
      ],
      highlightTitle: "कंट्रोलर लाभ",
      highlightDescription: "बैटरी विश्वसनीयता के लिए स्मार्ट कंट्रोल।",
      highlightItems: [
        { label: "प्रकार", value: "स्मार्ट PWM" },
        { label: "उपयोग", value: "ऑफ-ग्रिड और बैटरी सिस्टम" },
        { label: "टारगेट मार्केट", value: "OEM और बल्क खरीदार" },
        { label: "डिजाइन फोकस", value: "किफायती विश्वसनीयता" },
      ],
      detailParagraphs: [
        "ये कंट्रोलर ऑफ-ग्रिड और बैटरी-आधारित सिस्टम में स्थिर चार्जिंग परफॉर्मेंस के लिए बनाए गए हैं।",
      ],
    },
    {
      id: "oem-bulk-supply",
      title: "OEM और बल्क सप्लाई क्षमता",
      mainDescription:
        "फुजीटेक विभिन्न प्रोडक्ट कैटेगरी में डिस्ट्रीब्यूटर्स, डीलर्स और संस्थागत खरीदारों के लिए संरचित बल्क सप्लाई क्षमता उपलब्ध कराती है।",
      featureTitle: "सप्लाई स्ट्रेंथ",
      features: [
        { title: "डीलर नेटवर्क सपोर्ट", description: "डिस्ट्रीब्यूशन-फोकस्ड सप्लाई चेन मॉडल।", icon: "grid" },
        { title: "बल्क प्राइसिंग स्ट्रक्चर", description: "वॉल्यूम-आधारित कमर्शियल मॉडल।", icon: "chart" },
        { title: "क्वालिटी कंट्रोल", description: "प्रोडक्शन-लेवल टेस्टिंग स्टैंडर्ड।", icon: "shield" },
      ],
      highlightTitle: "बिजनेस मॉडल",
      highlightDescription: "मैन्युफैक्चरिंग-बैक्ड स्केलेबिलिटी।",
      highlightItems: [
        { label: "सप्लाई", value: "पैन-इंडिया डिस्ट्रीब्यूशन" },
        { label: "फोकस", value: "OEM और डीलर्स" },
        { label: "क्वालिटी", value: "संरचित टेस्टिंग वर्कफ्लो" },
        { label: "स्केलेबिलिटी", value: "बल्क मैन्युफैक्चरिंग रेडी" },
      ],
      detailParagraphs: [
        "हम खुद को भारत के रिन्यूएबल एनर्जी इकोसिस्टम के लिए एक विश्वसनीय हार्डवेयर मैन्युफैक्चरिंग पार्टनर के रूप में स्थापित करते हैं।",
      ],
    },
  ],
  faqs: [
    {
      question: "क्या आप इंस्टॉलेशन सेवाएं देते हैं?",
      answer:
        "फुजीटेक मुख्य रूप से मैन्युफैक्चरिंग और प्रोडक्ट सप्लाई पर केंद्रित है। इंस्टॉलेशन पार्टनर नेटवर्क के माध्यम से सपोर्ट किया जा सकता है।",
    },
    {
      question: "क्या आप बल्क या डीलर ऑर्डर सपोर्ट करते हैं?",
      answer: "हाँ, हम OEM पार्टनरशिप, डीलर नेटवर्क और संस्थागत बल्क प्रोक्योरमेंट सपोर्ट करते हैं।",
    },
    {
      question: "आप कौन-कौन से इन्वर्टर बनाते हैं?",
      answer: "हम रेजिडेंशियल और कमर्शियल उपयोग के लिए ऑन-ग्रिड, ऑफ-ग्रिड और हाइब्रिड इन्वर्टर बनाते हैं।",
    },
    {
      question: "क्या आप ईवी चार्जर भी बनाते हैं?",
      answer: "हाँ, हम लिथियम ई-रिक्शा चार्जर और इलेक्ट्रिक स्कूटी चार्जर सहित उत्पाद बनाते हैं।",
    },
  ],
  serviceOverview: {
    label: "सेवा अवलोकन",
    description:
      "हमारी सेवाएं लंबी अवधि की विश्वसनीयता के लिए तैयार की गई हैं और डीलर, OEM पार्टनर तथा कमर्शियल खरीदारों को व्यावहारिक प्रोडक्ट चयन, स्केलेबल सप्लाई और भरोसेमंद तकनीकी सपोर्ट प्रदान करती हैं।",
  },
  inverterFooter: {
    prefix: "आप हमारे",
    linkLabel: "पूर्ण प्रोडक्ट पोर्टफोलियो",
    suffix: "को भी देख सकते हैं, जहां तकनीकी स्पेसिफिकेशन और मॉडल तुलना उपलब्ध हैं।",
  },
  sectionCta: {
    title: "बल्क ऑर्डर या डीलर पार्टनरशिप चाहिए?",
    description: "संरचित प्राइसिंग, OEM सप्लाई क्षमता और तकनीकी प्रोडक्ट गाइडेंस के लिए हमारी टीम से संपर्क करें।",
    primaryLabel: "बल्क प्राइसिंग पाएं",
    secondaryLabel: "डीलर बनें",
  },
  executionModel: {
    label: "एक्जीक्यूशन मॉडल",
    title: "हम प्रोजेक्ट और बल्क ऑर्डर कैसे डिलीवर करते हैं",
    description:
      "तकनीकी डिस्कवरी से लेकर कमर्शियल क्लोजर और फुलफिलमेंट तक, हम एक संरचित वर्कफ्लो अपनाते हैं जो संचार को स्पष्ट और डिलीवरी को पूर्वानुमेय बनाता है।",
  },
  faqHeading: "अक्सर पूछे जाने वाले प्रश्न",
  finalCta: {
    heading: "फुजीटेक सोलर एनर्जी के साथ साझेदारी करें",
    supportingText:
      "परफॉर्मेंस और स्केल के लिए बने विश्वसनीय सोलर इन्वर्टर, ईवी चार्जर, स्मार्ट चार्ज कंट्रोलर और पावर इलेक्ट्रॉनिक्स।",
    ctaLabel: "सेल्स टीम से संपर्क करें",
    ariaLabel: "अंतिम कॉल टू एक्शन",
    benefits: [
      "हाई-एफिशिएंसी प्रोडक्ट आर्किटेक्चर",
      "बल्क सप्लाई और OEM पार्टनरशिप रेडीनेस",
      "क्वालिटी-कंट्रोल्ड मैन्युफैक्चरिंग स्टैंडर्ड",
      "प्रोडक्ट चयन के लिए तकनीकी मार्गदर्शन",
      "संरचित पोस्ट-ऑर्डर कम्युनिकेशन",
    ],
  },
  mobileCtaLabel: "प्राइसिंग अनुरोध करें",
};

const SERVICES_CONTENT_BY_LOCALE: Record<Locale, ServicesContentBundle> = {
  en: EN_CONTENT,
  hi: HI_CONTENT,
};

export function getServicesContent(locale: Locale): ServicesContentBundle {
  return SERVICES_CONTENT_BY_LOCALE[locale] ?? EN_CONTENT;
}
