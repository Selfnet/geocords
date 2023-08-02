import { Button, buttonVariants } from "./ui/Button";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { IconPlus, IconDownload } from "@tabler/icons-solidjs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";
import { ShapeList } from "./ShapeList";
import { ShapeForm } from "./ShapeForm";

function SideCard() {
  return (
    <Card class="overflow-auto">
      <CardHeader class="grid grid-cols-2 gap-4 space-y-0">
        <div class="flex justify-start">
          <Dialog>
            <DialogTrigger class={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
              <IconPlus size={20} aria-label="Import Shape" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Shape</DialogTitle>
                <DialogDescription>This will try to import a shape from a given coordinate list.</DialogDescription>
              </DialogHeader>
              <ShapeForm />
            </DialogContent>
          </Dialog>
        </div>
        <div class="flex justify-end">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              alert("Not implemented yet.");
            }}
          >
            <IconDownload size={20} aria-label="Export All" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ShapeList />
      </CardContent>
    </Card>
  );
}

export default SideCard;
