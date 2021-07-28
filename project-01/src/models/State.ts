// State Abstract class
type Listener<T> = (items: T[]) => void;

export abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction);
  }
}
