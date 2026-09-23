import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Non-Attorney Disclaimer | Obotan Consult",
  description: "Learn about Obotan Consult’s research and writing support and read our full non-attorney immigration services disclaimer.",
};

export default function AboutUs() {
  return (
    <main id="main" className="wrap page-top prose">
      <p className="eyebrow">ABOUT OBOTAN CONSULT</p>
      <h1>Research with depth.<br />Writing with purpose.</h1>
      <p className="lead">Obotan Consult helps individuals and organizations present their experience, ideas and supporting documents clearly through research and writing support.</p>
      <h2>Who we are</h2>
      <p>Based in Cincinnati, Ohio, USA, Obotan Consult is a non-attorney immigration consultant offering CV and document review, research and petition writing support for individuals exploring EB1A, EB1B and EB2 National Interest Waiver (NIW). We also support business plan development, business documents and policy documents.</p>
      <p>Our role is to help organize client-provided information and communicate it clearly. A 40-minute consultation provides an opportunity to discuss your materials and the scope of research or writing assistance you need.</p>
      <aside className="notice" aria-label="Important non-attorney disclaimer">
        <strong>All immigration services provided by Obotan Consult are non-attorney services. Anyone requiring legal advice must contact a qualified, licensed immigration attorney.</strong>
      </aside>
      <section aria-labelledby="disclaimer">
        <h2 id="disclaimer">Full non-attorney services disclaimer</h2>
        <p><strong>Our professional status.</strong> Obotan Consult is not a law firm. We are not attorneys or accredited immigration representatives, and we are not authorized to act as legal representatives for petitioners. We do not represent clients before USCIS, immigration courts or other government agencies, and we do not sign or file petitions on anyone’s behalf.</p>
        <p><strong>Scope of support.</strong> All immigration-related services we offer are non-attorney research, document organization, CV review and writing support. These services do not include legal advice, legal opinions, legal eligibility determinations, selection of an immigration classification, or recommendations on legal strategy. Writing assistance does not replace an attorney’s review of the legal content or sufficiency of a petition.</p>
        <p><strong>When to contact an attorney.</strong> Anyone who requires legal advice must contact a qualified, licensed immigration attorney. Questions about eligibility, the appropriate immigration category, legal requirements, filing obligations, deadlines, responses to government notices or the legal consequences of an application should be directed to an immigration attorney.</p>
        <p><strong>Website and checklist information.</strong> Information on this website, including EB1A, EB1B and EB2 NIW descriptions and checklists, is for general informational purposes. Your checklist selections describe evidence you believe you have; they are not a legal assessment, an eligibility decision or a prediction of approval. Immigration requirements may change. Consult official government resources and an immigration attorney for advice about your individual circumstances.</p>
        <p><strong>No attorney-client relationship.</strong> Using this website, submitting a CV or other documents, booking a meeting or purchasing our services does not create an attorney-client relationship with Obotan Consult. Communications with us are not protected by attorney-client privilege. Our handling of submitted information is described in our <a className="content-link" href="/privacy">Privacy & service scope</a> page.</p>
        <p><strong>Responsibility for documents and filing.</strong> Clients are responsible for providing truthful, complete information and reviewing the accuracy of their documents. The appropriate petitioner or employer, with authorized legal counsel where engaged, remains responsible for legal decisions, required signatures, submission and applicable deadlines. Obotan Consult does not submit petitions for clients.</p>
        <p><strong>No guarantees or government affiliation.</strong> Obotan Consult is not affiliated with, endorsed by or acting for USCIS or any government agency. We do not guarantee eligibility, petition approval, a visa, permanent residence, processing times or any other immigration outcome. Decisions are made by the relevant government authorities.</p>
        <p><strong>Agreed services.</strong> Any paid research or writing engagement requires a separate agreement setting out the non-attorney services, fees and deliverables. No description on this website or agreement authorizes Obotan Consult to provide legal advice or legal representation.</p>
      </section>
      <h2>Get in touch</h2>
      <p>For questions about our research and writing services, email <a className="content-link" href="mailto:obotanconsult@gmail.com">obotanconsult@gmail.com</a> or <a className="content-link" href="/#services">choose a service and book a consultation</a>.</p>
      <p className="tiny">For official information on finding qualified immigration help, visit the <a className="content-link" href="https://consumer.ftc.gov/articles/how-avoid-immigration-scams-and-get-real-help">Federal Trade Commission’s immigration help guide</a>.</p>
    </main>
  );
}

