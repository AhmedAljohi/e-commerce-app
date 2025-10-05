'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

type PropsType = {
  TriggerItem: React.ReactNode;
  menuLabel: string;
  menuItemList: {
    id: string;
    label: string;
    shortcut?: string;
  }[];
  position: 'start' | 'end';
  className: string;
};

export function Dropdown({
  TriggerItem,
  menuLabel,
  menuItemList,
  position,
  className,
}: PropsType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{TriggerItem}</DropdownMenuTrigger>
      <DropdownMenuContent className={className} align={position}>
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {menuItemList.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => console.log('item', item)}
            >
              {item.label}

              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
