import { z } from "zod";
import { ChevronDown, TextIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ObjectBlockType,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
} from "@/@types/form-block.type";
import { fontSizeClass, fontWeightClass } from "@/constant";
import { useBuilder } from "@/context/builder-provider";
import { Textarea } from "@/components/ui/textarea";

const blockType: FormBlockType = "Paragraph";
const blockCategory: FormCategoryType = "Field";

type fontSizeType = "small" | "medium" | "large";

type fontWeightType = "normal" | "lighter";

type attributesType = {
  label: string;
  text: string;
  fontSize: fontSizeType;
  fontWeight: fontWeightType;
};

const paragraphValidateSchema = z.object({
  text: z.string().trim().min(1).max(1000),
  fontSize: z.enum(["small", "medium", "large"]),
  fontWeight: z.enum(["normal", "lighter"]),
});

type ParagraphPropertiesSchema = z.infer<typeof paragraphValidateSchema>;

export const ParagraphBlock: ObjectBlockType = {
  blockType,
  blockCategory,

  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Paragraph",
      text: "Lorem ipsum dolor sit amet,consectetur adipiscing elit. Curabitur quis sem odio. Sed commodo vestibulum leo.",
      fontSize: "small",
      fontWeight: "normal",
    },
  }),

  // Button in the UI that allows the user to add a new block
  blockBtnElement: {
    icon: TextIcon,
    label: "Paragraph",
  },
  canvasComponent: CanvasFormComponent,
  formComponent: CanvasFormComponent,
  propertiesComponent: ParagraphPropertiesComponent, // Customizable properties editor
};

type CustomInstance = FormBlockInstance & {
  attributes: attributesType;
};

function CanvasFormComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as CustomInstance;
  const { text, fontSize, fontWeight } = block.attributes;

  return (
    <div
      className={`w-full text-left ${fontSizeClass[fontSize]} ${fontWeightClass[fontWeight]}`}
    >
      <p>{text}</p>
    </div>
  );
}

function ParagraphPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) {
  const { updateChildBlock } = useBuilder();
  const block = blockInstance as CustomInstance;

  const form = useForm<ParagraphPropertiesSchema>({
    resolver: zodResolver(paragraphValidateSchema),
    defaultValues: {
      text: block.attributes.text,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
    },
    mode: "onBlur",
  });

  const setChanges = (values: ParagraphPropertiesSchema) => {
    if (!parentId) return null;
    updateChildBlock(parentId, block.id, {
      ...block,
      attributes: {
        ...block.attributes,
        ...values,
      },
    });
  };

  return (
    <div className="w-full  pb-4">
      <div className="w-full flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
        <span className="text-sm font-medium text-gray-600 tracking-wider">
          Paragraph {positionIndex}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>
      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full space-y-3 px-4"
        >
          {/* Label */}
          {/* Text Content */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px] font-normal">
                    Content
                  </FormLabel>
                  <div className="w-full max-w-[400px]">
                    <FormControl>
                      <Textarea
                        {...field}
                        className="scrollbar"
                        onChange={(e) => {
                          field.onChange(e);
                          setChanges({
                            ...form.getValues(),
                            text: e.target.value,
                          });
                        }}
                        rows={4}
                        placeholder="Enter your paragraph text here"
                      />
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Font Size */}
          <FormField
            control={form.control}
            name="fontSize"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px] font-normal">
                    Font Size
                  </FormLabel>
                  <div className="w-full max-w-[187px]">
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value: fontSizeType) => {
                          field.onChange(value);
                          setChanges({
                            ...form.getValues(),
                            fontSize: value,
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Font Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Font Weight */}
          <FormField
            control={form.control}
            name="fontWeight"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px] font-normal">
                    Weight
                  </FormLabel>
                  <div className="w-full max-w-[187px]">
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value: fontWeightType) => {
                          field.onChange(value);
                          setChanges({
                            ...form.getValues(),
                            fontWeight: value,
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Font Weight" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Lighter</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}