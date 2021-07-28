import { State } from "../models/State.js";
import { Project, ProjectStatus } from "../models/Project.js";

// Project State Management
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    this.UpdateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(
      (findableProject) => findableProject.id === projectId
    );

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.UpdateListeners();
    }
  }

  private UpdateListeners() {
    for (const listenerFunction of this.listeners) {
      listenerFunction(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
