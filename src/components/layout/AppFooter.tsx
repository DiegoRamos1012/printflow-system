import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

const GITHUB_URL = "https://github.com/DiegoRamos1012";
const LINKEDIN_URL = "https://www.linkedin.com/in/diego-ramos-702a8922a/";

const linkClassName =
  "inline-flex items-center gap-1 font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline";

export function AppFooter() {
  return (
    <footer className="shrink-0 border-t bg-background px-6 py-4">
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>
          Desenvolvido por{" "}
          <span className="font-medium text-foreground/90">
            Diego Ramos dos Santos
          </span>
        </span>

        <span className="text-border">·</span>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          <GithubIcon className="h-3.5 w-3.5" />
          GitHub
        </a>

        <span className="text-border">·</span>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          <LinkedinIcon className="h-3.5 w-3.5" />
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
