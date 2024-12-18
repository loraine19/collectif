import { Avatar } from "@material-tailwind/react";
import Popover, { PopoverContent, PopoverHandler } from "@material-tailwind/react/components/Popover";
import { Profile } from "../../types/class";

type AvatarStackProps = { avatarDatas: Profile[] };
export function AvatarStack(props: AvatarStackProps) {
    const { avatarDatas } = props;
    return (
        <div className="flex items-center -space-x-3">
            {avatarDatas?.map(({ firstName, lastName, avatar }, index) =>

                <Popover key={index}>
                    <PopoverHandler>
                        <Avatar

                            variant="circular"
                            alt={firstName + " " + lastName}
                            className="border-2 border-white hover:z-10 focus:z-10"
                            src={avatar as string}
                            size="sm"
                        />

                    </PopoverHandler>
                    <PopoverContent>
                        {firstName + " " + lastName}
                    </PopoverContent>
                </Popover>

            )
            }
        </div>
    );
}