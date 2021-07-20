/**
 * @file Application entry point
 * @author David Else <david@elsewebdevelopment.com>
 * @copyright 2021 Your Name Here
 * @license gpl-3.0
 * @version 0.x
 */
const elem = document.getElementById("test") as HTMLElement;
elem.textContent += " World!";

export function example(): number {
  return 42;
}
