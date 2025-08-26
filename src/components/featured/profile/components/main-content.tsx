import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Globe, Info } from "lucide-react"

interface ProfilePageProps {
    description: string
    imgSrc: string
    geography: string
}

const MainContent = ({ description, geography }: ProfilePageProps) => {
    return (
        <div className="flex flex-col">
            <div className="grid md:grid-cols-2 w-full gap-6">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                        <AccordionTrigger className="items-center">
                            <div className="flex gap-2">
                                <Info size={32} />
                                <h1 className="text-2xl md:text-4xl"> Gambaran Umum</h1>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-justify justify-evenly text-wrap text-gray-500">{description}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="geography">
                        <AccordionTrigger className="items-center">
                            <div className="flex gap-2">
                                <Globe size={32} />
                               <h1 className="text-2xl md:text-4xl"> Geografis Wilayah</h1>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-justify justify-evenly text-wrap text-gray-500">{geography}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>

    )
}

export default MainContent
