import {
  getSettingUrl,
  getBusinessInfor,
  getLandingSetting,
  getDomainInfo,
} from "@dtravel/helpers/api/merchant";
import { SettingUrlProps } from "@dtravel/helpers/interfaces";
import axios from "axios";
import { converHostDomain, isEmpty, isIP } from "./common";

export default async function serverProps(context: any) {
  const { req } = context;
  const { hostId } = context.query;
  const hostDomain = req?.headers?.host;
  const publicSiteDomain = process.env.NEXT_PUBLIC_SITE_URL?.replace(
    "http://",
    ""
  )?.replace("https://", "");
  let userId: string =
    process.env.NEXT_PUBLIC_USER_ID || "1fc1d4ac-47a6-4212-81d9-e261f4e64e87";
  let settingUrl: SettingUrlProps | null = null;
  let businessInfor: any = null;
  let landingSetting: any = null;
  let err: any = null;

  if (userId || hostId) {
    try {
      const [resSettingUrl, resBusinessInfor, resLandingSetting] =
        await Promise.all([
          getSettingUrl((userId || hostId)?.toLowerCase()),
          getBusinessInfor((userId || hostId)?.toLowerCase()),
          getLandingSetting((userId || hostId)?.toLowerCase()),
        ]);
      settingUrl =
        !isEmpty(resSettingUrl.data) &&
        ((resSettingUrl.data || []).find((v: SettingUrlProps) => v.isPrimary) ||
          null);
      businessInfor = resBusinessInfor.data;
      landingSetting = resLandingSetting.data;
    } catch (error: any) {
      err = { statusCode: 404 };
    }
  }
  return { userId, settingUrl, businessInfor, landingSetting, error: err };
}
