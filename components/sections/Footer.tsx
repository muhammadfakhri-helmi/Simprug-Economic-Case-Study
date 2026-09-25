import { person, project } from "@/data/economic-case-study";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-deep py-14">
      <div className="container-page grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="font-display text-[2rem] leading-none">{person.name}</p>
          <p className="mt-3 text-text-2">
            {person.role} · {person.discipline}
          </p>
        </div>
        <div className="space-y-2 text-caption text-text-3 md:text-right">
          <p>
            {project.name} — {project.title}. {project.context.slice(0, 2).join(" · ")}.
          </p>
          <p>Figures come from the project report; values read from charts are marked as approximate. The 3D field is a conceptual illustration, not a model of the real reservoir.</p>
        </div>
      </div>
    </footer>
  );
}
