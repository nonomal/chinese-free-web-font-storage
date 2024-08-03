declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"post": {
"cdn_analyze.md": {
	id: "cdn_analyze.md";
  slug: "cdn_analyze";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"cn-font-split.md": {
	id: "cn-font-split.md";
  slug: "cn-font-split";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"cn_font_split_design.md": {
	id: "cn_font_split_design.md";
  slug: "cn_font_split_design";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"deploy_to_cdn.md": {
	id: "deploy_to_cdn.md";
  slug: "deploy_to_cdn";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"deployment-architecture-of-zi-tu-cdn.md": {
	id: "deployment-architecture-of-zi-tu-cdn.md";
  slug: "deployment-architecture-of-zi-tu-cdn";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"font_split_turbo.md": {
	id: "font_split_turbo.md";
  slug: "font_split_turbo";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"free_static_site_deploy.md": {
	id: "free_static_site_deploy.md";
  slug: "free_static_site_deploy";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"get_start.md": {
	id: "get_start.md";
  slug: "get_start";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"how_to_support_font_feature.md": {
	id: "how_to_support_font_feature.md";
  slug: "how_to_support_font_feature";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"performace_turbo.md": {
	id: "performace_turbo.md";
  slug: "performace_turbo";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"prompt_for_article.md": {
	id: "prompt_for_article.md";
  slug: "prompt_for_article";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"simple_tutorial.md": {
	id: "simple_tutorial.md";
  slug: "simple_tutorial";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"transport_imagekit.md": {
	id: "transport_imagekit.md";
  slug: "transport_imagekit";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
