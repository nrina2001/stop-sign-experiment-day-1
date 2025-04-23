const fs = require("fs");
const path = require("path");

const resultsDir = "./results/";

// Column headers
const headers = [
  "participantId",
  "taskType",
  "stimulusType",
  "stopTrial",
  "responseTime",
  "correct",
  "ssd",
];

// Read all JSON files in results/
fs.readdirSync(resultsDir).forEach((file) => {
  if (file.endsWith(".json")) {
    const fullPath = path.join(resultsDir, file);
    const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    const participantId = data.participantId;

    const rows = [headers.join(",")]; // Initialize rows for this file

    data.results.forEach((trial) => {
      // ❌ Skip practice trials
      if (trial.taskType === "practice") return;

      const row = [
        participantId,
        trial.taskType,
        trial.stimulusType,
        trial.stopTrial,
        trial.responseTime ?? "",
        trial.correct,
        trial.ssd,
      ];
      rows.push(row.join(","));
    });

    // Create a separate CSV file per JSON file
    const csvFileName = path.basename(file, ".json") + ".csv";
    const csvFilePath = path.join(resultsDir, csvFileName);

    // Save the rows to the CSV file
    fs.writeFileSync(csvFilePath, rows.join("\n"));
    console.log(`✅ CSV written to ${csvFilePath} (practice trials filtered out)`);
  }
});
