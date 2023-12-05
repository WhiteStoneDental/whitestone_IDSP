import React from "react";
import { OpenAIResult, Issue } from "./Results";
import { AccordionItem } from "@/components/Accordion";

export default function ResultsAccordion({
  results,
}: {
  results: OpenAIResult;
}) {
  return (
    <div className="w-full max-w-md max-h-screen overflow-y-hidden mx-auto">
      {results.severe && results.severe.length > 0 && (
        <div>
          <h3 className="text-black font-bold text-2xl mb-3 dark:text-white cursor-pointer">
            Severe
          </h3>
          {results.severe.map((item: Issue, index: number) => (
            <AccordionItem
              key={index}
              title={item.issue_title}
              content={<p>{item.issue_description}</p>}
              link={"/resources"}
            />
          ))}
          <hr className="border-t border-white dark:border-white border-solid my-5"></hr>
        </div>
      )}
      {results.moderate && results.moderate.length > 0 && (
        <div>
          <h3 className="text-black font-bold text-2xl mb-3 dark:text-white cursor-pointer">
            Moderate
          </h3>
          {results.moderate.map((item: Issue, index: number) => (
            <AccordionItem
              key={index}
              title={item.issue_title}
              content={<p>{item.issue_description}</p>}
              link={"/resources"}
            />
          ))}
          <hr className="border-t border-white dark:border-white border-solid my-5"></hr>
        </div>
      )}
      {results.mild && results.mild.length > 0 && (
        <div>
          <h3 className="text-black font-bold text-2xl mb-3 dark:text-white cursor-pointer">
            Mild
          </h3>
          {results.mild.map((item: Issue, index) => (
            <AccordionItem
              key={index}
              title={item.issue_title}
              content={<p>{item.issue_description}</p>}
              link={"/resources"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
