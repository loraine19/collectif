import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { TabLabel } from "../../../domain/entities/frontEntities";
import { useEffect } from "react";

export default function TabsMenu(props: { labels: TabLabel[]; defaultTab?: string }) {
    const { labels, defaultTab } = props

    useEffect(() => {
        const tab = document.querySelector(`[data-value="${defaultTab as string}"]`) as HTMLElement
        tab && tab.click()
    }, [])

    return (
        <Tabs value={defaultTab as string || labels[0].value} className="w-full max-width-100vh overflow-auto">
            <TabsHeader
                className="w-full !gap-2 !px-0 my-2 bg-transparent "
                indicatorProps={{ className: "bg-gray-900 rounded-full" }}>
                {labels.map(({ label, value, result }, index: number) => (
                    <Tab key={index}
                        value={value}
                        activeClassName="text-white"
                        className="text-sm whitespace-nowrap bg-white rounded-full shadow !px-3"
                        onClick={() => { result() }}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
        </Tabs>
    );
}
