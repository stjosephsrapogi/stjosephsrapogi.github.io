import aerial from "@/assets/campus_aerial.jpg.asset.json";
import classrooms from "@/assets/campus_classrooms.jpg.asset.json";
import debate from "@/assets/debate_champions.webp.asset.json";
import avenue from "@/assets/entrance_avenue.jpg.asset.json";
import gateDiocese from "@/assets/gate_sign_diocese.webp.asset.json";
import gateMinistry from "@/assets/gate_sign_ministry.jpg.asset.json";
import mofaSession from "@/assets/mofa_mentorship_session.jpg.asset.json";
import mofaGroup from "@/assets/mofa_partnership_group.jpg.asset.json";
import principal from "@/assets/principal_nyagwa.jpg.asset.json";
import bus from "@/assets/school_bus_students.webp.asset.json";
import celebrating from "@/assets/students_celebrating.webp.asset.json";
import procession from "@/assets/students_procession.webp.asset.json";

export const photos = {
  aerial: aerial.url,
  classrooms: classrooms.url,
  debate: debate.url,
  avenue: avenue.url,
  gateDiocese: gateDiocese.url,
  gateMinistry: gateMinistry.url,
  mofaSession: mofaSession.url,
  mofaGroup: mofaGroup.url,
  principal: principal.url,
  bus: bus.url,
  celebrating: celebrating.url,
  procession: procession.url,
};

export const gallery = [
  { src: photos.aerial, caption: "Our campus from above" },
  { src: photos.procession, caption: "Students in procession on the school field" },
  { src: photos.debate, caption: "Debate champions with their trophy" },
  { src: photos.mofaGroup, caption: "Equipment handover with the Michael Olunga Football Academy" },
  { src: photos.celebrating, caption: "Celebrating together on the field" },
  { src: photos.mofaSession, caption: "MOFA mentorship session with students" },
  { src: photos.bus, caption: "The Rapogi school bus" },
  { src: photos.avenue, caption: "The tree-lined entrance avenue" },
  { src: photos.classrooms, caption: "Classroom blocks among the trees" },
  { src: photos.gateMinistry, caption: "The main gate" },
  { src: photos.gateDiocese, caption: "Diocese of Homa Bay gate sign" },
  { src: photos.principal, caption: "Chief Principal Mr. Erastus Nyagwa" },
];
