/**
 * @param {number} V
 * @param {number[][]} adj
 * @returns {boolean}
 */
class Solution {
  isCycle(V, edges) {
    let adj = new Array(V).fill(0).map(() => []);
    let vis = new Array(V).fill(false);

    for (let [src, dest] of edges) {
      adj[src].push(dest);
      adj[dest].push(src);
    }

    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        let queue = new Array();
        queue.push({ src: -1, dest: i });
        vis[i] = true;
        while (queue.length) {
          let { src, dest } = queue.shift();

          for (let neighbor of adj[dest]) {
            if (neighbor === src) continue; // skip the edge to parent
            if (vis[neighbor]) return true; // visited and not parent → cycle
            vis[neighbor] = true;
            queue.push({ src: dest, dest: neighbor });
          }
        }
      }
    }
    return false;
  }
}
