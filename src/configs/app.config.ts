import env from "@/common/utils/env";

export class AppConfigs {
	public static readonly I18N_STORAGE_KEY = "i18nextLng";
	public static readonly QUERY_CLIENT_CACHE_STORAGE_KEY =
		"queryClientOfflineCache";
	public static readonly TOAST_DURATION = 2000;
	public static readonly BASE_API_URL = env("VITE_API_BASE_URL");
}
