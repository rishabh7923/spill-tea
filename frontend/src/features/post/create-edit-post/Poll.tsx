"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function PollCreator() {
    const [anonymous, setAnonymous] = useState(false);

    const [options, setOptions] = useState([
        "",
        "",
    ]);

    const updateOption = (index: number, value: string) => {
        setOptions((prev) =>
            prev.map((option, i) =>
                i === index ? value : option
            )
        );
    };

    const addOption = () => {
        if (options.length >= 4) return;
        setOptions((prev) => [...prev, ""]);
    };

    const removeOption = (index: number) => {
        if (options.length <= 2) return;

        setOptions((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    return (
        <Card className="border-0 shadow-none">
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4"
                        >
                            <Input
                                className="text-lg p-6"
                                value={option}
                                onChange={(e) =>
                                    updateOption(
                                        index,
                                        e.target.value
                                    )
                                }
                                placeholder={`Option ${index + 1}`}
                            />

                            {options.length > 2 && (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="hover:bg-destructive dark:hover:bg-destructive/50"
                                    onClick={() =>
                                        removeOption(index)
                                    }
                                >
                                    <X className="size-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {options.length < 4 && (
                    <Button
                        variant="ghost"
                        className="gap-2"
                        onClick={addOption}
                    >
                        <Plus className="size-4" />
                        Add option
                    </Button>
                )}

                <Button className="w-full p-6  flex  items-center" variant="destructive">Remove Poll</Button>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="anonymous"
                            checked={anonymous}
                            onCheckedChange={(checked) =>
                                setAnonymous(
                                    checked === true
                                )
                            }
                        />

                        <label
                            htmlFor="anonymous"
                            className="text-sm text-muted-foreground"
                        >
                            Anonymous voting
                        </label>
                    </div>

                    <Select defaultValue="1">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="1">
                                1 Day
                            </SelectItem>
                            <SelectItem value="3">
                                3 Days
                            </SelectItem>
                            <SelectItem value="7">
                                1 Week
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}