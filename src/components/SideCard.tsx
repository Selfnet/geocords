import { Button, buttonVariants } from "./ui/Button";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { IconSquareRoundedPlus, IconFileExport } from "@tabler/icons-solidjs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";
import { ShapeList } from "./ShapeList";
import { ShapeForm } from "./ShapeForm";

function SideCard() {
    return (
        <Card class="overflow-auto">
            <CardHeader class="grid grid-cols-2 gap-4 space-y-0">
                <div class="flex flex-col justify-start">
                    <Dialog>
                        <DialogTrigger class={buttonVariants({ variant: "ghost", size: "icon-sm" })}><IconSquareRoundedPlus size={20} aria-label="GitHub Icon" /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Import Shape</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data
                                    from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <ShapeForm />
                        </DialogContent >
                    </Dialog>
                </div>
                <div class="flex flex-col justify-end">
                    <Button variant="ghost" size="icon-sm"><IconFileExport size={20} aria-label="GitHub Icon" /></Button>
                </div>
            </CardHeader>
            <CardContent>
                <ShapeList />
            </CardContent>
        </Card>
    )
}

export default SideCard;
