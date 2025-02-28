"use client";
import React from "react";
import SubAccirdion from "./SubAccirdion";

function SettingsRole() {
  return (
    <div>
      <SubAccirdion title="Адміністратор">
        <h3 className="text-mainBlue text-[18px] mb-4">
          Надати доступ до редагування наступних пунктів:
        </h3>
        <div className="border-b border-crm-secondary-blue">
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <label className="cursor-pointer text-sm" htmlFor="name-admin">
                Ім'я
              </label>
              <label
                className="relative flex cursor-pointer items-center rounded-full "
                htmlFor="name-admin"
                data-ripple-dark="true">
                <input
                  id="name-admin"
                  type="checkbox"
                  className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                />
                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                      stroke="#F8F9FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <label className="cursor-pointer text-sm" htmlFor="photo-admin">
                Фото
              </label>
              <label
                className="relative flex cursor-pointer items-center rounded-full "
                htmlFor="photo-admin"
                data-ripple-dark="true">
                <input
                  id="ripple-on"
                  type="checkbox"
                  className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                />
                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                      stroke="#F8F9FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-crm-secondary-blue mb-3">
              Основна інформація
            </h4>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <label className="cursor-pointer text-sm" htmlFor="date-prybut">
                  Дата/адреса прибуття
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-prybut"
                  data-ripple-dark="true">
                  <input
                    id="date-prybut"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label className="cursor-pointer text-sm" htmlFor="date-type">
                  Тип/стать/вага/вік тварини
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-type"
                  data-ripple-dark="true">
                  <input
                    id="date-type"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="date-location">
                  Поточна локація
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-location"
                  data-ripple-dark="true">
                  <input
                    id="date-location"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="date-coments">
                  Загальний коментар
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-coments"
                  data-ripple-dark="true">
                  <input
                    id="date-coments"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="date-device">
                  Прилаштування
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-device"
                  data-ripple-dark="true">
                  <input
                    id="date-device"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="date-death">
                  Смерть
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-death"
                  data-ripple-dark="true">
                  <input
                    id="date-death"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h4 className="text-sm text-crm-secondary-blue mb-3">
              Медична інформація
            </h4>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <label className="cursor-pointer text-sm" htmlFor="date-casty">
                  Стерилізація/кастрация
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-casty"
                  data-ripple-dark="true">
                  <input
                    id="date-casty"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label className="cursor-pointer text-sm" htmlFor="date-chip">
                  Чіпування
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-chip"
                  data-ripple-dark="true">
                  <input
                    id="date-chip"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="date-vaccination">
                  Вакцинація
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-vaccination"
                  data-ripple-dark="true">
                  <input
                    id="date-vaccination"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="date-diagnoses">
                  Хвороби і діагнози
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-diagnoses"
                  data-ripple-dark="true">
                  <input
                    id="date-diagnoses"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="date-procedures">
                  Процедури
                </label>
                <label
                  className="relative flex cursor-pointer items-center rounded-full "
                  htmlFor="date-procedures"
                  data-ripple-dark="true">
                  <input
                    id="date-procedures"
                    type="checkbox"
                    className="peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block  before:-translate-y-2/4 before:-translate-x-2/4   before:opacity-0 before:transition-opacity checked:border-mainBlue checked:bg-mainBlue hover:before:opacity-10"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.6663 0.791748L4.24967 7.20841L1.33301 4.29175"
                        stroke="#F8F9FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </SubAccirdion>
      <SubAccirdion title="Водій">
        <h3 className="text-mainBlue text-[18px]">
          Надати доступ до редагування наступних пунктів:
        </h3>
      </SubAccirdion>
      <SubAccirdion title="Волонтер">
        <h3 className="text-mainBlue text-[18px]">
          Надати доступ до редагування наступних пунктів:
        </h3>
      </SubAccirdion>
      <SubAccirdion title="Лікар">
        <h3 className="text-mainBlue text-[18px]">
          Надати доступ до редагування наступних пунктів:
        </h3>
      </SubAccirdion>
      <SubAccirdion title="Фотограф">
        <h3 className="text-mainBlue text-[18px]">
          Надати доступ до редагування наступних пунктів:
        </h3>
      </SubAccirdion>
    </div>
  );
}

export default SettingsRole;
