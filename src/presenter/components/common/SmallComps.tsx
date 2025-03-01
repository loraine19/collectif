import { Avatar, List, ListItem, ListItemPrefix, Popover, PopoverContent, PopoverHandler, Progress, Typography, } from "@material-tailwind/react";
import { Link, } from "react-router-dom";
import { Profile } from "../../../domain/entities/Profile";
import { useState } from "react";
import parse from "html-react-parser";




/// Button to flag usable in any component
export function FlagIcon(props: { flagged: boolean, id: number, type: string }) {
    const { flagged, id, type } = props;
    const to = `/flag${flagged ? '/edit' : ''}/${type}/${id}`
    return (
        <Icon
            icon="flag_2"
            link={to}
            color={flagged ? 'red' : 'gray'}
            fill={flagged} size="xl"
            title={"signaler " + type}
            style="hover:!bg-red-500/30 hover:text-red-700  " />
    )
}




export function Icon(props: {
    icon: string, style?: string, fill?: boolean, size?: string, onClick?: () => void, color?: string, bg?: boolean, title?: string, link?: string, disabled?: boolean
}) {
    const { title, icon, disabled, onClick } = props
    let size = props.size ? props.size : "2xl"
    size === 'sm' && (size = '!text-[0.8rem]')
    size === 'md' && (size = '!text-[1rem]')
    size === 'lg' && (size = '!text-[1.2rem]')
    size === 'xl' && (size = '!text-[1.2rem]')
    size === '2xl' && (size = '!text-[1.4rem]')
    size === '3xl' && (size = '!text-[1.6rem]')
    size === '4xl' && (size = '!text-[2.2rem]')
    size === '5xl' && (size = '!text-[2.8rem]')
    const pad = props.bg ? 'px-[0.26em] pb-[0.03em]' : 'px-1'
    const fill = props.fill ? "fillThin" : ""
    const color = props.color ? props.color : 'gray'
    const textColor = props.color ? `text-${color}-700` : "text-gray-900"
    const bg = (props.bg && props.color) && `bg-${color}-500 bg-opacity-30 ` || props.bg && "!bg-gray-300" || ''
    const style = props.style || ""
    const link = props.link || ""
    const classIcon = `icon notranslate pt-0.5  flex items-center justify-center ${size} ${fill} ${style} ${textColor} ${bg} ${pad}`
    const classActive = `hover:backdrop-brightness-[85%] hover:!bg-opacity-30 hover:!shadow hover:${pad} rounded-full transition-all duration-200 ease-in-out `
    if (onClick) {
        return <button
            type="button"
            onClick={onClick}
            title={!disabled ? title : title + ' est desactivée'}
            className={`${classIcon} ${!disabled && classActive} `}
            disabled={disabled}>
            {icon}
        </button>
    }
    if (link) {
        return <Link
            to={link}
            title={title}
            rel="noopener noreferrer"
            className={`${classIcon} ${classActive}  `}>
            {icon}
        </Link>
    }
    else {
        return <span
            title={title}
            className={`${classIcon} `}>
            {icon}</span>;
    }
}


export function ProgressLargebar(props: { value: number, float?: boolean, label?: string }) {
    const { value, float, label } = props
    const style = float ? "h-max w-full !rounded-full  backdrop-blur flex items-center gap-2 shadow p-2" :
        "!rounded-full bg-cyan-200 backdrop-blur flex items-center gap-2 shadow p-2"

    return (
        <div className={style}>
            {value > 0 ? <Progress
                value={value}
                color={value >= 100 ? "green" : "gray"}
                size="md"
                label={value >= 100 ? " Validé" : ' '} /> :
                <div className="flex flex-1 bg-white/70 rounded-full h-max items-center justify-center">
                    <Typography
                        className="mb-0 text-xs font-medium">
                        pas encore de {label}
                    </Typography>
                </div>}
        </div>)
}





export function ProfileDiv(props: { profile: Profile, size?: string }) {
    const { profile } = props

    const size = !props.size ? "sm" : props.size
    return (
        <div className="flex items-center px-0 gap-2">
            <Popover placement="bottom-start">
                <PopoverHandler>
                    <Avatar
                        src={profile?.image as string || "../image/person.svg"}
                        size={size as any}
                        alt="avatar"
                        className="BgUser shadow" />
                </PopoverHandler>
                <PopoverContent className="w-72">
                    <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                        <Avatar
                            src={profile?.image as string || "../image/person.svg"}
                            size="sm"
                            alt="avatar"
                            className="BgUser border-blue-gray-500" />
                        <div className="flex flex-col">
                            <Typography
                                variant="h6"
                                color="blue-gray">{profile?.firstName} {profile?.lastName}
                            </Typography>
                            <Typography
                                variant="small"
                                className="font-normal text-blue-gray-500">
                                {profile?.skills}
                            </Typography>
                        </div>
                    </div>
                    <List className="p-0">
                        <ListItem className="rounded-2xl !py-0">
                            <ListItemPrefix>
                                <Icon
                                    icon="distance"
                                    fill
                                    size="2xl"
                                    color="blue-gray" />
                            </ListItemPrefix>
                            {profile?.Address?.city}, {profile?.Address?.zipcode}
                        </ListItem>
                    </List>
                </PopoverContent>
            </Popover>
            <div className="flex flex-col">
                <Typography
                    variant={size === "xl" ? "h5" : "h6"}
                    color="blue-gray"
                    className="border-b border-blue-gray-200 pr-4">
                    {profile?.firstName} {profile?.lastName}
                </Typography>
                <Typography
                    variant={size === "xl" ? "h6" : "small"}
                    className="font-normal text-blue-gray-500">
                    ◦ {profile?.skills}
                </Typography>
            </div>
        </div>


    )
}


export function Title(props: { title: string, flagged?: boolean, id?: number, CreatedAt?: string | Date, subTitle?: string, type?: string }) {
    const { flagged, id, CreatedAt, subTitle, type } = props
    const titleElement = document.getElementById(props.title);
    const maxLength = titleElement && titleElement.scrollWidth > titleElement.clientWidth ? 90 : 42;
    const [title, setTitle] = useState<string>(props.title?.length > maxLength ? props.title.slice(0, maxLength - 3) + '...' + (parse('&nbsp;').toString()).repeat(props.title?.length - maxLength) : props.title)
    return (
        <div className="min-h-max">
            <div className="flex items-center w-full  justify-between  gap-2">
                <div className="flex items-center gap-4 !max-w-[calc(100%-1.5rem)] w-full">
                    <Typography
                        onScroll={() => { setTitle(props.title) }}
                        id={props.title} variant="h6" color="blue-gray"
                        className="w-full flex whitespace-nowrap overflow-x-auto "
                        title={props.title}>
                        {title}
                    </Typography>
                    {CreatedAt && <span className="text-xs">{new Date(CreatedAt).toLocaleDateString('fr-FR')}</span>}
                </div>
                {id &&
                    <FlagIcon
                        flagged={flagged ? true : false}
                        id={id}
                        type={type || ''} />
                }
            </div>
            {subTitle &&
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="truncate font-normal">
                    {subTitle}
                </Typography>}
        </div>)
}



