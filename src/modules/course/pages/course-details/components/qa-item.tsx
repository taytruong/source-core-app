import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/shared/components/ui/accordion';
import { CourseQA } from '@/src/shared/types';

export interface QaItemProps {
  item: CourseQA;
}

function QaItem({ item }: QaItemProps) {
  return (
    <Accordion
      collapsible
      type="single"
    >
      <AccordionItem value={item.question}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent className="mt-2.5">{item.answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default QaItem;
