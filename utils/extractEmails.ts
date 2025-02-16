import Papa from "papaparse";

/**
 * Validates an email address using regex.
 * @param email - The email string to validate.
 * @returns True if the email is valid, false otherwise.
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


/**
 * Extracts emails from a CSV file, considering whether the first row is a header.
 * @param file - The CSV file.
 * @param hasHeader - Boolean indicating if the first row is a header.
 * @returns A promise that resolves to an array of extracted emails.
 */
export const extractEmailsFromCSV = async (
  file: File,
  hasHeader: boolean = false
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const emails: string[] = [];

    Papa.parse<string[]>(file, {
      complete: (result) => {
        let rows: string[][] = result.data;

        // Remove empty rows
        rows = rows.filter((row) => row.length > 0);

        // If the first row is a header, remove it
        if (hasHeader && rows.length > 0) {
          rows.shift();
        }

        // Extract emails from the first column
        for (const row of rows) {
          if (row[0] && validateEmail(row[0])) {
            emails.push(row[0]);
          }
        }

        resolve(emails);
      },
      error: (error) => reject(error),
    });
  });
};
