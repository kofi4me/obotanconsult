import { ArrowUpRight, FileText, Award, GraduationCap, Globe2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
const services = [
 { slug: "business-docs", label: "Business Docs", title: "Ideas with a clear direction.", text: "Research, business plans, policy documents and professional writing shaped around your objectives.", icon: FileText },
 { slug: "eb1a", label: "EB1A", title: "Give your achievements a voice.", text: "CV review and evidence-led writing support for extraordinary ability petition materials.", icon: Award },
 { slug: "eb1b", label: "EB1B", title: "Bring your academic impact into focus.", text: "Document and writing support for outstanding professors and researchers working with a U.S. employer.", icon: GraduationCap },
 { slug: "eb2", label: "EB2", title: "Articulate the value of your endeavor.", text: "Research and writing support for National Interest Waiver materials, including proposed endeavor and business plans.", icon: Globe2 },
];
export default function Home() {return <main id="main">
 <section className="hero wrap"><div><p className="eyebrow">RESEARCH. CLARITY. POSSIBILITY.</p><h1>Your work has<br/>a story.<br/><em>Make it count.</em></h1><p className="lead">Turn your achievements and ideas into clear, compelling documents. Research, CV review and writing support for your next chapter.</p><div className="hero-actions"><Button asChild className="cta"><a href="#services">Explore our services <ArrowUpRight/></a></Button><a className="text-link" href="#how-it-works">How it works</a></div><p className="micro">No client account needed · 40-minute consultations</p></div>
 <aside className="hero-note"><div className="note-top"><span>THE OBOTAN APPROACH</span><span>01—03</span></div><h2>Strong documents.<br/>Grounded in<br/><em>your evidence.</em></h2>{[["01","Understand your story","Review your CV, goals and existing documents."],["02","Bring structure to your work","Connect research, facts and supporting materials."],["03","Write with purpose","Develop clear, well-organized documents."]].map(([n,t,p])=><div className="note-row" key={n}><span>{n}</span><div><h3>{t}</h3><p>{p}</p></div></div>)}<div className="note-bottom"><Check size={16}/> Research and writing support</div></aside></section>
 <section className="professional-intro wrap" aria-labelledby="professional-intro-title">
   <p className="eyebrow">FOR PROFESSIONALS IN THE UNITED STATES & ABROAD</p>
   <h2 id="professional-intro-title">Accomplished work.<br/>Thoughtful petition support.</h2>
   <div className="professional-intro-copy">
     <p>Are you a <strong>researcher, professor, engineer, healthcare professional, IT/cybersecurity expert, business professional, scientist, or other accomplished professional</strong> in the United States or abroad considering an <strong>EB-1A, EB-1B, or EB-2</strong> employment-based immigration petition?</p>
     <p><strong>Obotan Consult</strong> provides <strong>non-attorney immigration consultancy and petition-support services</strong>, including profile assessment, evidence organization, petition-document preparation support, proposed-endeavor development, recommendation-letter drafting assistance, and RFE-response support.</p>
     <p>Whether you are <strong>currently in the United States or living abroad</strong>, contact <strong>Obotan Consult</strong> to discuss your professional profile and available petition-support options.</p>
     <p className="tiny">Our EB-2 services focus on National Interest Waiver (NIW) materials.</p>
     <a className="text-link" href="#services">Discuss your professional profile <ArrowUpRight size={18}/></a>
   </div>
 </section>
 <section className="services wrap" id="services"><div className="section-heading"><div><p className="eyebrow">HOW WE CAN HELP</p><h2>A clear path to your next step.</h2></div><p>Choose a service to learn more<br/>and start your consultation.</p></div><div className="service-grid">{services.map((s,i)=><a className="service-card" href={`/services/${s.slug}`} key={s.slug}><div className="card-top"><s.icon size={25} strokeWidth={1.4}/><span>0{i+1}</span></div><h3>{s.label}</h3><h4>{s.title}</h4><p>{s.text}</p><span className="card-link">Explore {s.label} <ArrowUpRight size={19}/></span></a>)}</div></section>
 <section className="process" id="how-it-works"><div className="wrap"><p className="eyebrow">FROM FIRST LOOK TO FIRST CONVERSATION</p><div className="section-heading"><h2>Start with what you have.</h2><p>Simple steps. A focused conversation.</p></div><div className="process-grid">{[["01","Tell us about your work","Choose a service and tick the evidence or document support relevant to you."],["02","Share your CV or brief","Attach your CV for immigration support, or describe your business document project."],["03","Make time for your next step","Choose an available 40-minute appointment to discuss your documents and writing needs."]].map(([n,t,d])=><div key={n}><span className="process-number">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
 <section className="wrap closing"><div><p className="eyebrow">RESEARCH. DOCUMENTS. PERSONAL SUPPORT.</p><h2>Your story, carefully written.</h2><p>From CV review and evidence organization to petition writing support, business plans and policy documents, we help bring clarity and structure to your next project.</p></div><a className="text-link" href="#services">Find your service <ArrowUpRight size={18}/></a></section>
 </main>}


