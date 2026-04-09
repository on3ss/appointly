import { z } from "zod";

export const serviceSchema = z.object({
  team_id: z.number().min(1, "Team is required"),
  name: z.string().min(1, "Service name is required"),
  description: z.string().nullable().optional(),
  rich_description: z.string().nullable().optional(),
  service_type: z.string().min(1, "Service type is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  settings: z.string().refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid JSON format" }
  ),
  allowed_modes: z.array(z.string()).min(1, "Select at least one mode"),
  location_address: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  contact_phone: z.string().nullable().optional(),
  contact_email: z.email("Invalid email").nullable().optional(),
  is_recurring_allowed: z.boolean().default(false),
  requires_membership: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;