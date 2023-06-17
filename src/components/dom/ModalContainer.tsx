"use client";

import { useState } from "react";
import { accordionData } from "@/data/AccordionData";
import Project from "@/components/dom/Accordion";
import Modal from "@/components/dom/Modal";

export default function ModalContainer() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <main className="flex items-center justify-center h-screen mt-[100vh]">
      <div className="w-screen flex items-center justify-center flex-col">
        {accordionData.map((project, index) => {
          return (
            <Project
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              setModal={setModal}
            />
          );
        })}
      </div>
      <Modal modal={modal} projects={accordionData} />
    </main>
  );
}
