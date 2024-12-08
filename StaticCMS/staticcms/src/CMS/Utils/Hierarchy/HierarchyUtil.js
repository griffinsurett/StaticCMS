/**
 * HierarchyUtil.js
 * Utility to manage hierarchical relationships between items.
 */

export class HierarchyUtil {
  constructor(collections) {
    this.collections = collections;
    this.hierarchyMap = this.buildHierarchyMap();
  }

  /**
   * Build a hierarchy map from the collections.
   * @returns {Object} - A map of item slugs to their children.
   */
  buildHierarchyMap() {
    const map = {};
    this.collections.forEach((collection) => {
      if (Array.isArray(collection.items)) {
        collection.items.forEach((item) => {
          const parentSlug = item.parentItem || null;
          if (parentSlug) {
            if (!map[parentSlug]) map[parentSlug] = [];
            map[parentSlug].push(item.slug);
          }
        });
      }
    });
    return map;
  }

  /**
   * Get children of a given item.
   * @param {string} slug - The slug of the item.
   * @returns {Array} - List of child slugs.
   */
  getChildren(slug) {
    return this.hierarchyMap[slug] || [];
  }

  /**
   * Get all descendants of a given item recursively.
   * @param {string} slug - The slug of the item.
   * @param {Array} descendants - Accumulator for recursive calls.
   * @returns {Array} - List of all descendant slugs.
   */
  getAllDescendants(slug, descendants = []) {
    const children = this.getChildren(slug);
    descendants.push(...children);
    children.forEach((childSlug) => this.getAllDescendants(childSlug, descendants));
    return descendants;
  }

  /**
   * Get the parent of an item.
   * @param {string} slug - The slug of the item.
   * @returns {string|null} - The parent slug or null if none.
   */
  getParent(slug) {
    for (const [parent, children] of Object.entries(this.hierarchyMap)) {
      if (children.includes(slug)) {
        return parent;
      }
    }
    return null;
  }

  /**
   * Get all ancestors of an item recursively.
   * @param {string} slug - The slug of the item.
   * @param {Array} ancestors - Accumulator for recursive calls.
   * @returns {Array} - List of all ancestor slugs.
   */
  getAllAncestors(slug, ancestors = []) {
    const parent = this.getParent(slug);
    if (parent) {
      ancestors.push(parent);
      this.getAllAncestors(parent, ancestors);
    }
    return ancestors;
  }

  /**
   * Build a hierarchical tree for a given item.
   * @param {string} slug - The slug of the root item.
   * @returns {Object} - Hierarchical tree structure.
   */
  buildHierarchyTree(slug) {
    const children = this.getChildren(slug);
    return {
      slug,
      children: children.map((childSlug) => this.buildHierarchyTree(childSlug)),
    };
  }
}

export default HierarchyUtil;
