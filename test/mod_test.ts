import { assertEquals } from "../deps.ts";
import { example } from "../src/main.ts";

Deno.test({
  name: "example test",
  fn(): void {
    // Arrange
    const expectedResult = 42;
    // Act
    const result = example();
    // Assert
    assertEquals(result, expectedResult);
  },
});
