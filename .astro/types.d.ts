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
"zh/cdn_analyze.md": {
	id: "zh/cdn_analyze.md";
  slug: "zh/cdn_analyze";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/cn-font-split.md": {
	id: "zh/cn-font-split.md";
  slug: "zh/cn-font-split";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/cn_font_split_design.md": {
	id: "zh/cn_font_split_design.md";
  slug: "zh/cn_font_split_design";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/deploy_to_cdn.md": {
	id: "zh/deploy_to_cdn.md";
  slug: "zh/deploy_to_cdn";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/deployment-architecture-of-zi-tu-cdn.md": {
	id: "zh/deployment-architecture-of-zi-tu-cdn.md";
  slug: "zh/deployment-architecture-of-zi-tu-cdn";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/font_split_turbo.md": {
	id: "zh/font_split_turbo.md";
  slug: "zh/font_split_turbo";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/free_static_site_deploy.md": {
	id: "zh/free_static_site_deploy.md";
  slug: "zh/free_static_site_deploy";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/get_start.md": {
	id: "zh/get_start.md";
  slug: "zh/get_start";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/how_to_support_font_feature.md": {
	id: "zh/how_to_support_font_feature.md";
  slug: "zh/how_to_support_font_feature";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/performace_turbo.md": {
	id: "zh/performace_turbo.md";
  slug: "zh/performace_turbo";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/prompt_for_article.md": {
	id: "zh/prompt_for_article.md";
  slug: "zh/prompt_for_article";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/simple_tutorial.md": {
	id: "zh/simple_tutorial.md";
  slug: "zh/simple_tutorial";
  body: string;
  collection: "post";
  data: any
} & { render(): Render[".md"] };
"zh/transport_imagekit.md": {
	id: "zh/transport_imagekit.md";
  slug: "zh/transport_imagekit";
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
