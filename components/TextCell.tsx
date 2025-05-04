/*
 * @Author: Vincent Yang
 * @Date: 2025-05-03 21:36:17
 * @LastEditors: Vincent Yang
 * @LastEditTime: 2025-05-03 21:55:30
 * @FilePath: /yet-another-sub-web/components/TextCell.tsx
 * @Telegram: https://t.me/missuo
 * @GitHub: https://github.com/missuo
 * 
 * Copyright © 2025 by Vincent, All Rights Reserved. 
 */
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button, Input } from "@nextui-org/react"
import copy from "copy-to-clipboard"
import { toast } from "sonner"

export const TextCell = ({
    label,
    value,
    placeholder,
}: {
    label: string,
    value: string,
    placeholder: string
}) => (
    <Input
        isReadOnly
        variant="bordered"
        label={label}
        value={value}
        placeholder={placeholder}
        endContent={
            < div className="w-9 h-9 justify-center items-center flex" >
                <Button
                    isIconOnly
                    isDisabled={value === ''}
                    variant="light"
                    onPress={() => {
                        copy(value)
                        toast.success(`${label} copied to clipboard`)
                    }}>
                    <Icon icon="solar:copy-line-duotone" />
                </Button>
            </div >
        }
    />)