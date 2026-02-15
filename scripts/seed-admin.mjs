// Copyright (c) 2026 Kaif Azmi
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createUser } from './lib/auth'; // adjust path

(async () => {
  try {
    await createUser({
      name: "Admin",
      email: "kaifazmi211@gmail.com",
      password: "admin123"
    });
    console.log("Admin seeded");
  } catch (err) {
    console.error("Seed failed:", err);
  }
  process.exit();
})();
