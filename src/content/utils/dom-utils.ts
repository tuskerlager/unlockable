// src/utils/dom-utils.ts - Security-focused DOM manipulation
export class SafeDOM {
    static setText(element: HTMLElement, text: string): void {
      element.textContent = text;
    }
  
    static createElement(tag: string, text?: string, className?: string): HTMLElement {
      const element = document.createElement(tag);
      if (text) element.textContent = text;
      if (className) element.className = className;
      return element;
    }
  
    static createInput(type: string, attributes: Record<string, string | boolean> = {}): HTMLInputElement {
      const input = document.createElement('input') as HTMLInputElement;
      input.type = type;
      
      Object.entries(attributes).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          input[key as keyof HTMLInputElement] = value as any;
        } else {
          input.setAttribute(key, value);
        }
      });
      
      return input;
    }
  
    static appendChildren(parent: HTMLElement, children: HTMLElement[]): void {
      children.forEach(child => parent.appendChild(child));
    }
  
    static replaceContent(parent: HTMLElement, newChildren: HTMLElement[]): void {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      this.appendChildren(parent, newChildren);
    }
  
    static removeElement(element: HTMLElement): void {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  
    static addClass(element: HTMLElement, className: string): void {
      element.classList.add(className);
    }
  
    static removeClass(element: HTMLElement, className: string): void {
      element.classList.remove(className);
    }
  
    static toggleClass(element: HTMLElement, className: string): void {
      element.classList.toggle(className);
    }
  }