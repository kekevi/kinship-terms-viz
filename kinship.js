// (basically an interface)
export class Kinship {
  /** get the name for the type of relation 
   * @param {String} path
  */
  static getName(path) {
    return 'relative'
  }

  /**
   * splits a string path with '.' separators into a list of strings (without '.')
   * @param {String} path 
   */
  static splitPath(path) {
    return path.split('.')
  }

}