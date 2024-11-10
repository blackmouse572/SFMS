import { AdvisoryLevel, AdvisoryStatus, AdvisoryValue } from '@lib/types';

export const LEVEL_OPTIONS = Object.values(AdvisoryLevel).map((level) => ({
  label: level,
  value: level,
}));

export const VALUE_OPTIONS = Object.values(AdvisoryValue).map((value) => ({
  label: value,
  value,
}));

export const STATUS_OPTIONS = Object.values(AdvisoryStatus).map((status) => ({
  label: status,
  value: status,
}));

export const getAdvisoryKey = {
  list: (filter?: Record<string, any>) => ['advisory', filter],
  id: (id: string) => ['advisory', id],
};
