import { buttonVariants } from "@/components/ui/Button";
import { IconBrandGithub } from "@tabler/icons-solidjs";

function Footer() {

    return (<footer
        class="container mb-4 mt-16 flex flex-col-reverse items-center justify-between gap-8 sm:flex-row md:mb-8 md:flex-row"
        aria-label="Footer"
    >
        <div class="flex h-5 items-center space-x-6 text-sm">
            <a class={buttonVariants({ variant: "link", size: "none" })} href="https://selfnet.de/imprint.html" target="_blank">Impressum</a>
        </div>
        <div class="items-center flex flex-row gap-4">
            <a
                aria-label="GitHub"
                href={"https://git.selfnet.de"}
                class={buttonVariants({ variant: "ghost", size: "icon-sm" })}
                target="_blank"
            ><IconBrandGithub size={20} aria-label="GitHub Icon" />
            </a>
        </div>
    </footer>)
}

export default Footer;
