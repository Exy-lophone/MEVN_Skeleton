type ArrowProps = {
    direction: "down" | "up" | "left" | "right"  
}

type TextboxProps = {
    value?: string,
    type?: string,
    center?: boolean,
    readonly?: boolean,
    placeholder?: string,
    color?: string,
    leftArrow?: { show: boolean, direction: ArrowProps['direction'] },
    rightArrow?: { show: boolean, direction: ArrowProps['direction'] },
    prefix?: { show: boolean, text: string },
    width?: number
}

type DropdownProps = {
    items: { display: string, value?: string}[],
    center?: boolean,
    prefix?: TextboxProps['prefix'],
    color?: string
}

type TrashIconProps = {
    width?: number,
    height?: number,
    color?: string
}

export type {
    ArrowProps,
    TextboxProps,
    DropdownProps,
    TrashIconProps
}