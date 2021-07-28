import { Component } from "./baseComponent.js";
import { ProjectItem } from "./projectItem.js";

import { DragTarget } from "../models/dragAndDrop.js";
import { Project, ProjectStatus } from "../models/Project.js";
import { projectState } from "../state/project.js";
import { AutoBind } from "../decorators/autoBind.js";

// ProjectList Class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listElement.innerHTML = "";

    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (
      event.dataTransfer &&
      event.dataTransfer.types[0] === "text/plain"
    ) {
      event.preventDefault();
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const projectID = event.dataTransfer?.getData("text/plain")!;
    projectState.moveProject(
      projectID,
      this.type === "active"
        ? ProjectStatus.Active
        : ProjectStatus.Finished
    );
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.remove("droppable");
  }

  @AutoBind
  dragLeaveHandler(_event: DragEvent) {
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.remove("droppable");
  }
}
