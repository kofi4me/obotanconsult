import {notFound} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import {findService} from "@/lib/services";
import {Intake} from "@/components/intake";
export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const service=findService(slug);if(!service)notFound();
 return <main id="main"><div className="wrap page-top"><a className="back-link" href="/#services"><ArrowLeft size={15}/> All services</a><p className="eyebrow">{service.label} / RESEARCH & WRITING SUPPORT</p><h1>{service.title}</h1><p className="lead">{service.description}</p></div><div className="wrap intake-wrap"><Intake service={service}/></div></main>;
}
