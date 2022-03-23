export default class Randoms {

  /**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
  static GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}