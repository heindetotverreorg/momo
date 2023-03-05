import { describe, it, expect } from "vitest"
import { pathParentMatch } from '../../../utils/pathParentMatch'

describe('pathParentMatch: test/unit/test/pathParentMatch.ts', () => {
  it('should return false if page is root and has parent', () => {
    const pathArr = ['1stlevel']
    const page = {
      parent: ['invalid-parent'],
    }
    expect(pathParentMatch(pathArr, page)).toBe(false);
  });

  it('should return true if page is root and has no parent', () => {
    const pathArr = ['1stlevel']
    const page = {
      parent: [],
    }
    expect(pathParentMatch(pathArr, page)).toBe(true);
  })

  it('should return false if first part of path does not match with parent', () => {
    const pathArr = ['1stlevel', '2ndlevel']
    const page = {
      parent: ['invalid-parent'],
    }
    expect(pathParentMatch(pathArr, page)).toBe(false);
  })

  it('should return true if all path array parts match with the parent array parts in the same order', () => {
    const pathArr = ['1stlevel', '2ndlevel', '3rdlevel']
    const page = {
      parent: ['1stlevel', '2ndlevel'],
    }
    expect(pathParentMatch(pathArr, page)).toBe(true);
  })

  it('should return true if all path array parts match with the parent array parts but not in the same order', () => {
    const pathArr = ['2ndlevel', '1stlevel', '3rdlevel']
    const page = {
      parent: ['1stlevel', '2ndlevel'],
    }
    expect(pathParentMatch(pathArr, page)).toBe(false);
  })
});