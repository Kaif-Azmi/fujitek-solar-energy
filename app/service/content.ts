import type { CtaLink, FaqItem, HighlightItem, NavItem, ProcessStep } from "@/components/services/types";

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

export const heroContent: { title: string; intro: string; ctas: [CtaLink, CtaLink, CtaLink] } = {
  title: "Residential and Commercial Solar Services",
  intro:
    "Serving Uttar Pradesh, Delhi, Haryana & Rajasthan with end-to-end residential and commercial solar solutions. From rooftop solar planning to inverter integration, EV charger deployment, and long-term maintenance, our certified engineers execute each project with performance-focused design and safety-first installation standards. We support subsidy-ready documentation for eligible residential systems. Every project is delivered with clear warranty commitments, transparent technical scope, and structured after-sales support. We design each system around sanctioned load, energy profile, roof constraints, and expansion plans so your investment delivers measurable output over the long term.",
  ctas: [
    { label: "Book Free Consultation", href: "/contact" },
    { label: "Get Solar Quote", href: "/contact" },
    { label: "Talk to Our Experts", href: "/contact" },
  ],
};

export const sectionNavItems: NavItem[] = [
  { id: "solar-panel-installation", label: "Solar Panels" },
  { id: "solar-inverter-installation", label: "Inverters" },
  { id: "ev-charger-installation", label: "EV Chargers" },
  { id: "solar-maintenance-monitoring", label: "Maintenance" },
  { id: "our-installation-process", label: "Process" },
  { id: "service-areas", label: "Service Areas" },
  { id: "faqs", label: "FAQs" },
];

export const trustMetrics = [
  { value: "500+", label: "Installations executed across residential and commercial sites" },
  { value: "25-Year", label: "Panel performance warranty alignment on quality component choices" },
  { value: "MNRE", label: "Process-led subsidy and compliance-ready project documentation" },
  { value: "24/7", label: "After-sales support response model for sustained system performance" },
];

export const serviceSections: ServiceSectionContent[] = [
  {
    id: "solar-panel-installation",
    title: "Solar Panel Installation",
    mainDescription:
      "Solar panel installation has the highest long-term impact on your electricity economics, but only when system architecture, component selection, and execution quality are aligned. Fujitek follows a practical engineering approach for homes, offices, schools, clinics, and industrial rooftops in Uttar Pradesh. The process starts with a technical survey that measures usable area, shading pattern, roof strength, cable pathways, and distribution panel readiness. We then build an output-focused design instead of selling fixed-size packages, because a correctly designed 5kW plant can outperform a poorly installed 6kW plant in real conditions. Delivery planning includes survey, design sign-off, approvals, procurement, installation, and commissioning so timelines are transparent from day one. Cost planning is also presented in itemized form, covering module class, inverter category, structure quality, rooftop civil constraints, protection hardware, cable length, and monitoring scope. This approach helps residential and commercial buyers compare value on engineering quality and lifecycle performance rather than only on headline price.",
    featureTitle: "Technical Design Priorities",
    features: [
      {
        title: "On-grid vs Off-grid Solar Systems",
        description:
          "On-grid systems are connected to utility supply and usually provide the best payback where grid availability is stable and net-metering is available. Off-grid systems use battery storage to supply power independently and suit locations with high backup dependency. Hybrid-ready architecture keeps battery expansion open.",
        icon: "grid",
      },
      {
        title: "3kW, 5kW, and 10kW Capacity Planning",
        description:
          "Capacity is mapped to annual units consumed, daytime usage, and expansion goals. A 3kW system often fits compact homes, 5kW fits growing families, and 10kW serves high-consumption homes and commercial users when supported by roof layout and electrical integration.",
        icon: "chart",
      },
      {
        title: "Installation Timeline and Cost Factors",
        description:
          "Delivery includes survey, design, approvals, procurement, installation, and commissioning. Cost varies by module class, inverter category, structure quality, rooftop civil conditions, cable lengths, and safety scope. We provide itemized costing for transparent ROI decisions.",
        icon: "shield",
      },
    ],
    highlightTitle: "Solar Panel Project Snapshot",
    highlightDescription: "A structured approach for output stability and long-term payback.",
    highlightItems: [
      { label: "System Options", value: "On-grid, Off-grid, and Hybrid-ready architecture" },
      { label: "Capacity Bands", value: "3kW, 5kW, 10kW, and custom commercial sizing" },
      { label: "Warranty", value: "Manufacturer-backed component coverage with workmanship assurance" },
      { label: "Performance", value: "Generation modeled against irradiation, dust, and seasonal conditions" },
    ],
    detailParagraphs: [
      "Warranty clarity is essential at purchase stage. Fujitek documents manufacturer-backed coverage for panels and inverters, along with installation workmanship accountability. Performance expectations are communicated with realistic generation modeling for local irradiation, dust, temperature, and seasonal conditions.",
      "To preserve yield, we pair installation with maintenance and monitoring plans that detect output drift early.",
    ],
  },
  {
    id: "solar-inverter-installation",
    title: "Solar Inverter Installation",
    mainDescription:
      "The inverter is the control center of a solar plant. It drives conversion efficiency, grid synchronization, diagnostics, and operational safety. Fujitek treats inverter installation as a dedicated engineering scope, not an accessory bundled after panel sales. For every project, we evaluate PV array behavior, voltage window, load profile, and utility interface conditions before recommending a configuration. Inverter selection is linked to actual operating goals: bill reduction, outage resilience, battery readiness, export behavior, and long-term system expansion. We also map critical and non-critical loads so backup logic is practical and measurable. During commissioning, our team validates protections, checks operating parameters, and tunes settings for site-specific conditions such as voltage fluctuation tolerance and alarm behavior. This reduces avoidable trips and improves uptime reliability. For users with existing plants, retrofit and replacement audits are available to identify mismatched inverter behavior, improve fault handling, and restore stable generation performance with proper documentation and verifiable field logs.",
    featureTitle: "Inverter Engineering Framework",
    features: [
      {
        title: "Hybrid vs On-grid Inverter Selection",
        description:
          "On-grid inverters are suitable where bill reduction is the primary objective and utility availability is consistent. Hybrid inverters are ideal for outage resilience, battery integration, and critical-load backup logic, especially where load behavior varies by location and season.",
        icon: "grid",
      },
      {
        title: "Load Calculation and Technical Sizing",
        description:
          "We evaluate sanctioned load, peak demand, motor startup behavior, and critical versus non-critical circuits. Correct sizing avoids tripping, clipping, and thermal stress while improving conversion efficiency and equipment life.",
        icon: "chart",
      },
      {
        title: "Safety Compliance and Monitoring Capability",
        description:
          "Safety controls include earthing integrity, AC/DC isolation, surge protection, breaker coordination, and insulation testing. Monitoring dashboards expose trends, event logs, and alarms so faults are detected before savings are affected.",
        icon: "shield",
      },
    ],
    highlightTitle: "Inverter Installation Highlights",
    highlightDescription: "Grid stability, safety compliance, and long-term diagnostics in one scope.",
    highlightItems: [
      { label: "Inverter Types", value: "Hybrid and On-grid options based on outage and backup goals" },
      { label: "Load Logic", value: "Critical/non-critical mapping and startup behavior assessment" },
      { label: "Safety Scope", value: "Earthing, isolators, SPD, and tested protection coordination" },
      { label: "Monitoring", value: "Commissioned dashboard with event and performance tracking" },
    ],
    detailParagraphs: [
      "If you are upgrading an old plant, we also support inverter replacement and retrofit audits to improve reliability. For users comparing options, our engineering team explains inverter topology and operational behavior in clear, non-sales language so decisions are technically defensible.",
      "We also tune inverter settings during commissioning for site-specific behavior such as voltage fluctuation tolerance, export limits where required, and alarm handling priorities. This improves operating stability and helps prevent avoidable shutdowns during grid disturbances. A documented commissioning report is shared so customers can track baseline performance and verify output trends over time.",
    ],
  },
  {
    id: "ev-charger-installation",
    title: "EV Charger Installation",
    mainDescription:
      "EV charging infrastructure must be designed for safety, reliability, and usage growth. Fujitek installs EV chargers for individual homes, apartment parking, office campuses, retail properties, and commercial fleets across Uttar Pradesh. Each deployment is planned around vehicle mix, dwell time, electrical capacity, and operating hours so charging experience remains consistent even as usage scales. We begin by assessing parking layout, sanctioned load, distribution board capacity, phase availability, and feeder routing, because charger performance depends on electrical design quality as much as hardware choice. For commercial and shared environments, infrastructure planning includes access logic, metering considerations, bay utilization, and expansion pathways so early deployment does not become a bottleneck later. Safety remains non-negotiable, with dedicated protections, earthing integrity, and commissioning checks built into every install. Where required, design can align with rooftop solar and energy scheduling to support lower operating costs and better long-term energy management for both residential and business users.",
    featureTitle: "EV Charging Deployment Framework",
    features: [
      {
        title: "Home and Commercial Setup Planning",
        description:
          "Home installations prioritize parking access, cable route safety, weather protection, and DB integration. Commercial setups require bay allocation, user access policy, metering design, and future charger expansion planning to maintain utilization.",
        icon: "grid",
      },
      {
        title: "Charger Types and Power Load Requirements",
        description:
          "Charger selection is mapped to battery size, charging window, and electrical infrastructure. We evaluate sanctioned load, spare panel capacity, feeder sizing, and protection design to prevent nuisance tripping and sustain operation.",
        icon: "chart",
      },
      {
        title: "Compliance, Safety, and Future-ready Design",
        description:
          "Dedicated circuit protection, proper earthing, controlled cable management, and commissioning checks are mandatory. We also design for solar integration and smart load management so infrastructure remains expansion-ready.",
        icon: "shield",
      },
    ],
    highlightTitle: "EV Infrastructure Essentials",
    highlightDescription: "Scalable architecture for residential, enterprise, and mixed-use deployments.",
    highlightItems: [
      { label: "Setup Types", value: "Home, apartment, office, retail, and fleet charging environments" },
      { label: "Electrical Scope", value: "Load assessment, feeder sizing, phase planning, and protection checks" },
      { label: "Compliance", value: "Safety-first execution with commissioning documentation" },
      { label: "Future Readiness", value: "Expandable points with optional solar and smart energy integration" },
    ],
    detailParagraphs: [
      "For apartment communities and office campuses, we can also design phased expansion plans with spare capacity and distribution architecture for additional charging points. This avoids costly rewiring when EV adoption increases. By planning infrastructure in phases, property owners can launch quickly, track utilization, and scale charging access with controlled capital allocation and predictable electrical safety standards.",
      "Where required, we can also align charger deployment with billing visibility and user-level access controls so residential societies and commercial operators can manage shared usage without operational confusion.",
    ],
  },
  {
    id: "solar-maintenance-monitoring",
    title: "Solar Maintenance & Performance Monitoring",
    mainDescription:
      "Solar asset performance declines when maintenance is irregular, especially under dust-heavy and high-temperature operating conditions common in North India. Fujitek provides structured maintenance and monitoring services for both residential and commercial systems, including systems installed by third-party vendors. Our maintenance framework is designed to protect generation consistency through planned cleaning, preventive inspections, and data-backed performance reviews rather than reactive fault calls alone. We evaluate panel soiling trends, inverter event behavior, electrical connection health, and earthing integrity to reduce unplanned downtime and preserve savings targets. Monitoring workflows include output trend checks, alert interpretation, and variance tracking so hidden degradation is identified before it impacts annual return. For high-usage sites, periodic reporting supports internal energy governance and finance-side validation of expected performance. Maintenance plans can be tailored through AMC options based on system size and criticality, ensuring that service frequency, response timelines, and scope remain aligned with the technical and commercial importance of the plant.",
    featureTitle: "Ongoing Performance Assurance",
    features: [
      {
        title: "Cleaning Schedule and Generation Stability",
        description:
          "Panel cleaning frequency is based on dust load, tilt angle, rainfall pattern, and access conditions. We use generation trends to schedule cleaning at practical intervals that protect annual yield while controlling service cost.",
        icon: "grid",
      },
      {
        title: "Performance Monitoring and Preventive Maintenance",
        description:
          "Monitoring includes output trend reviews, alert interpretation, and event analysis. Preventive maintenance covers module inspection, DC/AC connection checks, cable verification, earthing validation, and safety device health checks.",
        icon: "chart",
      },
      {
        title: "AMC Plans and Long-term Service Support",
        description:
          "Annual Maintenance Contracts are available for homes, SMBs, and multi-site operators. Plans include periodic cleaning, scheduled inspections, monitoring support, and response timelines based on system criticality.",
        icon: "shield",
      },
    ],
    highlightTitle: "Maintenance Program Coverage",
    highlightDescription: "Protect output consistency with measured, scheduled, and data-backed service.",
    highlightItems: [
      { label: "Cleaning Cadence", value: "Site-specific schedules based on environmental exposure" },
      { label: "Monitoring Scope", value: "Trend analysis, alerts, event logs, and early fault detection" },
      { label: "Preventive Checks", value: "Electrical integrity, inverter health, and safety validation" },
      { label: "AMC Options", value: "Flexible plans with response SLAs for different plant sizes" },
    ],
    detailParagraphs: [
      "With disciplined maintenance, plants sustain output closer to design expectations and preserve long-term return on investment. If your current system shows recurring alerts or output drop, our engineers can perform a technical health audit and restoration plan.",
      "For commercial operators, periodic performance reports can also support internal energy reviews and finance-side validation of expected savings. This improves decision-making around expansions, component upgrades, and preventive capex planning. Maintenance is most effective when it is scheduled, measured, and linked to operating data rather than executed only after a visible drop in output.",
      "We also track baseline yield and month-on-month variance to identify hidden degradation before it affects annual savings targets.",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Consultation and Site Survey",
    description: "Load analysis, roof mapping, and shading review with a practical technical feasibility baseline.",
  },
  {
    title: "Technical Design and Proposal",
    description: "Capacity recommendation, generation estimate, and commercial scope built on site data.",
  },
  {
    title: "Approvals and Documentation",
    description: "Support for net-metering workflows and eligible subsidy documentation requirements.",
  },
  {
    title: "Material Planning and Installation",
    description: "Certified engineers execute mounting, electrical routing, protections, and integration.",
  },
  {
    title: "Testing and Commissioning",
    description: "Protection verification, performance checks, and customer handover with operating guidance.",
  },
  {
    title: "After-sales Support",
    description: "Monitoring guidance, preventive maintenance plans, and responsive service continuity.",
  },
];

export const whyChooseContent = [
  "Fujitek combines process-led delivery with field-ready execution. Our team handles complete EPC coordination with MNRE-aligned documentation awareness, robust engineering review, and structured quality checks. We have delivered installations across residential rooftops and commercial sites in multiple UP cities, including 3kW home systems, 5kW family systems, 10kW high-consumption installations, and larger customized capacities. The focus stays on practical output, safe commissioning, and reliable after-sales response instead of short-term sales promises.",
  "Key strengths include certified engineering supervision, clear technical communication, transparent scope definition, warranty-backed delivery, and support continuity after handover.",
];

export const serviceAreasText =
  "We provide solar, inverter, EV charger, and maintenance services in Lucknow, Noida, Kanpur, Prayagraj, and nearby areas across Uttar Pradesh. If your site is in or around these cities, we can schedule a visit and share a project-feasibility proposal.";

export const faqs: FaqItem[] = [
  {
    question: "What is the cost of solar installation in Uttar Pradesh?",
    answer:
      "Cost depends on system size, panel and inverter category, roof structure, wiring route, protection devices, and net-metering scope. A technical survey is required for an accurate quote.",
  },
  {
    question: "Can I get a government subsidy for rooftop solar?",
    answer:
      "Eligible residential consumers can apply under applicable central and state programs. Fujitek supports documentation and process alignment for subsidy-ready applications.",
  },
  {
    question: "How much time does a project take from survey to commissioning?",
    answer:
      "Typical residential installations are completed quickly after technical approvals and material readiness. Commercial timelines vary based on capacity, shutdown windows, and compliance scope.",
  },
  {
    question: "What warranty is provided on a solar system?",
    answer:
      "Warranty includes component-level manufacturer coverage and installation workmanship assurance as defined in your proposal and product datasheets.",
  },
  {
    question: "How often should solar panels be maintained and cleaned?",
    answer:
      "Cleaning and maintenance schedules depend on dust exposure, tilt, local weather, and generation trends. Periodic inspections and preventive maintenance are recommended for stable output.",
  },
  {
    question: "Are EMI or financing options available for solar projects?",
    answer:
      "EMI and financing options may be available based on project size, customer profile, and partner terms. The team can guide practical financing pathways during consultation.",
  },
  {
    question: "Which areas do you serve for solar and EV charging projects?",
    answer:
      "Fujitek serves Lucknow, Noida, Kanpur, Prayagraj, and nearby regions in Uttar Pradesh for residential and commercial solar and EV charging projects.",
  },
  {
    question: "How long does a solar system usually last?",
    answer:
      "A quality solar plant is a long-life asset. With proper design, installation, and preventive maintenance, systems can operate efficiently for decades.",
  },
];
