var launchMissiles = function(value) {
  missileSystem.launch("пли!");
};
if (safeMode)
  launchMissiles = function(value) {/* отбой */};