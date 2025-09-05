import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Globe, Info, Library, Search } from "lucide-react"

interface ProfilePageProps {
    description: string
    imgSrc: string
    geography: string
    references: string
    otherInfo: string
}

const MainContent = ({ description, geography, references, otherInfo }: ProfilePageProps) => {
    return (
        <div className="flex flex-col">
            <div className="grid md:grid-cols-2 w-full gap-6">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                        <AccordionTrigger className="items-center">
                            <div className="flex gap-2">
                                <Search size={32} />
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
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="references">
                        <AccordionTrigger className="items-center">
                            <div className="flex gap-2">
                                <Library size={32} />
                               <h1 className="text-2xl md:text-4xl"> Referensi</h1>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-justify justify-evenly text-wrap text-gray-500">{references}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="other-info">
                        <AccordionTrigger className="items-center">
                            <div className="flex gap-2">
                                <Info size={32} />
                               <h1 className="text-2xl md:text-4xl"> Info Lain</h1>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-justify justify-evenly text-wrap text-gray-500">{otherInfo}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>

    )
}

export default MainContent
