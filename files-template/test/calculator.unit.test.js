import { describe, it } from "node:test";
import assert from "node:assert";
import Calculator from "../server/models/calculator.server.model.js";

describe('formatFileSize function', () => {
  it('1 must be equal to 1', () => {
    let sum = Calculator.sum(2,2);
    assert.strictEqual(sum, 4);
  });
});