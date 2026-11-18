# Gherkin Step Kütüphanesi

> **OTOMATİK ÜRETİLDİ** — elle düzenleme. Yenilemek için:
> `node scripts/build-step-library.mjs`

Kaynak: AJETPSSD'de **`Automated`** statüsündeki 1105 Cucumber senaryosu 
(toplam 1105 eşleşen test). Üretim: 2026-11-12

## Neden bu dosya önemli

Bu katalogdaki her step, **koşan** bir senaryodan çıkarıldı — yani Java tarafında
karşılığı olan bir step definition **var**. Yeni BDD yazarken buradaki ifadeleri
birebir kullan. Uydurulmuş bir step, step definition bulunamadığı için senaryoyu
`UNDEFINED` yapar ve koşum patlar.

Gerekli step burada yoksa: senaryoyu yine yaz, ama o satırı `# YENİ STEP` ile işaretle
ve geliştiriciden step definition iste. Sessizce benzer bir step uydurma.

`<text>`, `<n>`, `<param>` yer tutucudur — yerine gerçek değeri koy.

**Kanal sütunu kritik:** `Web`=WEB-Desktop · `rIOS`=Responsive-IOS · `And`=Mobil-Android ·
`iOS`=Mobil-IOS · `APIw`=API-Web · `APIm`=API-Mobil.
UI ve API senaryoları tamamen ayrı kelime dağarcığı kullanır — UI senaryosu yazarken
`API*` işaretli step'leri kullanma, tersi de geçerli.
Sadece tek kanala odaklı katalog için: `node scripts/build-step-library.mjs --channel "Mobil-Android"`

**Özet:** 2168 benzersiz step, 130 sayfa/alan.
Kanal bazında step sayısı — WEB-Desktop: 1136 · API-Web: 689 · API-Mobil: 543 · Responsive-IOS: 29 · Mobil-Android: 5

## İçindekiler

- [Genel / sayfa belirtilmemis](#genel-sayfa-belirtilmemis) — 1063 step
- [Home Page](#home-page) — 105 step
- [Availability Page](#availability-page) — 62 step
- [Passenger Information Page](#passenger-information-page) — 29 step
- [Excess Baggage Page](#excess-baggage-page) — 30 step
- [Flight Management Page](#flight-management-page) — 22 step
- [Seat Selection Page](#seat-selection-page) — 26 step
- [City Guide Page](#city-guide-page) — 136 step
- [Payment Summary Page](#payment-summary-page) — 17 step
- [Additional Services Page](#additional-services-page) — 30 step
- [Feedback Form Page](#feedback-form-page) — 72 step
- [Thank You Page](#thank-you-page) — 10 step
- [Payment Page](#payment-page) — 6 step
- [Contact Info Page](#contact-info-page) — 47 step
- [Standalone Additional Services Page](#standalone-additional-services-page) — 17 step
- [City Page](#city-page) — 67 step
- [Baggage Tracking Page](#baggage-tracking-page) — 21 step
- [Services Page](#services-page) — 8 step
- [Search New Flight Page](#search-new-flight-page) — 12 step
- [My Info Page](#my-info-page) — 10 step
- [Flight Selection Page](#flight-selection-page) — 12 step
- [Standalone Seat Selection Page](#standalone-seat-selection-page) — 13 step
- [Flight Change Page](#flight-change-page) — 4 step
- [Standalone Excess Baggage Page](#standalone-excess-baggage-page) — 6 step
- [Registered Passengers Page](#registered-passengers-page) — 16 step
- [CIP Lounge Page](#cip-lounge-page) — 12 step
- [Apis Form Page](#apis-form-page) — 15 step
- [Campaigns Page](#campaigns-page) — 16 step
- [Sports Equipment Page](#sports-equipment-page) — 10 step
- [Standalone CIP Lounge Page](#standalone-cip-lounge-page) — 6 step
- [Cancellation Summary Page](#cancellation-summary-page) — 9 step
- [Standalone Sports Equipment Page](#standalone-sports-equipment-page) — 4 step
- [Standalone Meal Selection Page](#standalone-meal-selection-page) — 6 step
- [CheckIn Summary Page](#checkin-summary-page) — 3 step
- [Flight Status List Page](#flight-status-list-page) — 5 step
- [Account Settings Page](#account-settings-page) — 13 step
- [Sign Up Page](#sign-up-page) — 9 step
- [Stay Informed About Us Page](#stay-informed-about-us-page) — 13 step
- [Flight Change Summary Page](#flight-change-summary-page) — 4 step
- [Flight Status Detail Page](#flight-status-detail-page) — 6 step
- [Sport Equipment Page](#sport-equipment-page) — 1 step
- [Campaigns Detail Page](#campaigns-detail-page) — 7 step
- [My Flights Page](#my-flights-page) — 7 step
- [Forgot Password Page](#forgot-password-page) — 9 step
- [Standalone Sport Equipment Page](#standalone-sport-equipment-page) — 2 step
- [Flight Cancellation Page](#flight-cancellation-page) — 2 step
- [Success Page](#success-page) — 4 step
- [Flex Offer Page](#flex-offer-page) — 4 step
- [Special Discount Page](#special-discount-page) — 4 step
- [Info Page](#info-page) — 1 step
- [Passenger Info Page](#passenger-info-page) — 2 step
- [Feedback Form Received Page](#feedback-form-received-page) — 2 step
- [Feedback Previous Page](#feedback-previous-page) — 3 step
- [Rules And Conditions Page](#rules-and-conditions-page) — 2 step
- [Check-in Page](#check-in-page) — 3 step
- [Privacy And Cookie Policy Page](#privacy-and-cookie-policy-page) — 2 step
- [Flight Cancel Page](#flight-cancel-page) — 1 step
- [Add Summary Page](#add-summary-page) — 2 step
- [LONDON Page](#london-page) — 2 step
- [LEFKOSIA Page](#lefkosia-page) — 2 step
- [GENEVA Page](#geneva-page) — 2 step
- [HURGHADA Page](#hurghada-page) — 2 step
- [DUBAI Page](#dubai-page) — 2 step
- [COPENHAGEN Page](#copenhagen-page) — 2 step
- [CAIRO Page](#cairo-page) — 2 step
- [BUDAPEST Page](#budapest-page) — 2 step
- [BRUSSELS Page](#brussels-page) — 2 step
- [BISHKEK Page](#bishkek-page) — 2 step
- [BERLIN Page](#berlin-page) — 2 step
- [BELGRADE Page](#belgrade-page) — 2 step
- [BEIRUT Page](#beirut-page) — 2 step
- [BASEL Page](#basel-page) — 2 step
- [AMSTERDAM Page](#amsterdam-page) — 2 step
- [VAN Page](#van-page) — 2 step
- [TRABZON Page](#trabzon-page) — 2 step
- [TOKAT Page](#tokat-page) — 2 step
- [SIRNAK Page](#sirnak-page) — 2 step
- [SANLIURFA Page](#sanliurfa-page) — 2 step
- [SIVAS Page](#sivas-page) — 2 step
- [SAMSUN Page](#samsun-page) — 2 step
- [RIZE Page](#rize-page) — 2 step
- [ORDU_GIRESUN Page](#ordu_giresun-page) — 2 step
- [NEVSEHIR Page](#nevsehir-page) — 2 step
- [MUS Page](#mus-page) — 2 step
- [MARDIN Page](#mardin-page) — 2 step
- [MALATYA Page](#malatya-page) — 2 step
- [KONYA Page](#konya-page) — 2 step
- [KAYSERI Page](#kayseri-page) — 2 step
- [KARS Page](#kars-page) — 2 step
- [KAHRAMANMARAS Page](#kahramanmaras-page) — 2 step
- [IZMIR Page](#izmir-page) — 2 step
- [ISTANBUL Page](#istanbul-page) — 2 step
- [IGDIR Page](#igdir-page) — 2 step
- [HATAY Page](#hatay-page) — 2 step
- [GAZIANTEP Page](#gaziantep-page) — 2 step
- [ERZURUM Page](#erzurum-page) — 2 step
- [ERZINCAN Page](#erzincan-page) — 2 step
- [ELAZIG Page](#elazig-page) — 2 step
- [EDREMIT Page](#edremit-page) — 2 step
- [DIYARBAKIR Page](#diyarbakir-page) — 2 step
- [DENIZLI Page](#denizli-page) — 2 step
- [DALAMAN Page](#dalaman-page) — 2 step
- [CANAKKALE Page](#canakkale-page) — 2 step
- [BURSA Page](#bursa-page) — 2 step
- [BODRUM Page](#bodrum-page) — 2 step
- [BINGOL Page](#bingol-page) — 2 step
- [BATMAN Page](#batman-page) — 2 step
- [ANTALYA Page](#antalya-page) — 2 step
- [ANKARA Page](#ankara-page) — 2 step
- [AGRI Page](#agri-page) — 2 step
- [ADIYAMAN Page](#adiyaman-page) — 2 step
- [ADANA Page](#adana-page) — 2 step
- [ZURICH Page](#zurich-page) — 2 step
- [VIENNA Page](#vienna-page) — 2 step
- [TBILISI Page](#tbilisi-page) — 2 step
- [STOCKHOLM Page](#stockholm-page) — 2 step
- [SKOPJE Page](#skopje-page) — 2 step
- [SHARM_EL_SHEIKH Page](#sharm_el_sheikh-page) — 2 step
- [SARAJEVO Page](#sarajevo-page) — 2 step
- [ROME Page](#rome-page) — 2 step
- [PRISHTINA Page](#prishtina-page) — 2 step
- [PARIS Page](#paris-page) — 2 step
- [MILAN Page](#milan-page) — 2 step
- [LYON Page](#lyon-page) — 2 step
- [Personal Data Announcement Page](#personal-data-announcement-page) — 1 step
- [Contact Preferences Page](#contact-preferences-page) — 1 step
- [Ajet Cafe Page](#ajet-cafe-page) — 1 step
- [Android Home Page](#android-home-page) — 1 step
- [Android Booking Page](#android-booking-page) — 1 step
- [Ajet Android Availability Page](#ajet-android-availability-page) — 1 step

## Genel / sayfa belirtilmemis

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 448 | Web/rIOS | Given | `I accept all the cookies` |
| 422 | APIm/APIw/Web/rIOS | * | `Has been created by TDFA` |
| 343 | APIm/APIw/Web/rIOS | * | `Flights:` |
| 343 | APIm/APIw/Web/rIOS | * | `Passengers:` |
| 303 | APIm/APIw | Given | `Mock Availability Request` |
| 301 | APIm/APIw | When | `I send Availability Request` |
| 295 | APIm/APIw | * | `Availability flights:` |
| 295 | APIm/APIw | * | `Availability passengers:` |
| 274 | APIm/APIw | When | `Mock CreateBooking Request` |
| 274 | APIm/APIw | When | `I send CreateBooking Request` |
| 240 | APIm/APIw | When | `I send GetPassengers Request` |
| 214 | APIm/APIw | * | `Availability tripType is ONE_WAY` |
| 211 | APIm/APIw | When | `Mock ModifyPassengers Request` |
| 211 | APIm/APIw | When | `I send ModifyPassengers Request` |
| 185 | APIm/APIw/Web | * | `TripType is ONE_WAY` |
| 178 | APIm/APIw/Web/rIOS | Given | `A PNR with following parameters:` |
| 165 | APIm/APIw/Web | Given | `A Check-in PNR with following parameters:` |
| 146 | APIm/APIw | When | `I send GetBaggage Request` |
| 135 | APIm/APIw | Given | `Mock Check-in PnrLogin Request` |
| 135 | APIm/APIw | When | `I send Check-in PnrLogin Request` |
| 133 | APIm/APIw | And | `Check-in PnrLogin Request updated by context parameters` |
| 129 | APIm/APIw | When | `I send Check-in GetFlights Request` |
| 118 | APIm/APIw | When | `I send GetBookingDetails Request` |
| 110 | APIm/APIw/Web | * | `TripType is ONEWAY` |
| 107 | APIm/APIw/Web | And | `I Complete Perform Check-in Flow for:` |
| 97 | APIm/APIw | When | `Mock Check-in GetPassengers Request` |
| 97 | APIm/APIw | When | `I send Check-in GetPassengers Request` |
| 89 | APIm/APIw | And | `Mock PaymentSummary Request` |
| 89 | APIm/APIw | When | `I send PaymentSummary Request` |
| 87 | APIm/APIw | When | `I send InitializePayment Request` |
| 86 | APIm/APIw | When | `I send MyTrips MyFlightsInfo Request` |
| 86 | APIm/APIw | And | `I complete payment with credit card by CommonPay Payment Flow` |
| 86 | APIm/APIw | And | `Mock CompletePayment Request` |
| 86 | APIm/APIw | When | `I send CompletePayment Request` |
| 81 | APIm/APIw | * | `Availability tripType is ROUND_TRIP` |
| 79 | APIm/APIw/Web | Given | `A user with following parameters:` |
| 79 | APIm/APIw/Web | * | `User type is USER` |
| 76 | APIm/APIw | When | `I send MyTrips PnrLogin Request` |
| 75 | APIm/APIw | And | `Mock GetUpdatedAvailability Request` |
| 75 | APIm/APIw | When | `I send GetUpdatedAvailability Request` |
| 75 | APIm/APIw | Then | `Verify Check-in GetFlights Response for passengerTypeCount has "<param>"` |
| 75 | APIm/APIw | When | `I send Customer Login Request` |
| 68 | APIw | * | `CreateBooking Request updated with "<param>" package` |
| 68 | APIm/APIw | When | `I send MyTrips SendActivationCode Request` |
| 68 | APIm/APIw | * | `CreateBooking Request updated with given filters:` |
| 67 | APIm/APIw | When | `I send MyTrips CheckActivationCode Request` |
| 66 | APIm/APIw | And | `Mock MyTrips CheckActivationCode Request with otpCode "<param>"` |
| 63 | APIm | Then | `Verify Check-in GetSummary Response <n>. passenger has isBoardingCardPrintable is true` |
| 59 | APIm/APIw | When | `I send Check-in GetSummary Request` |
| 56 | APIm | Then | `Verify Check-in GetSummary Response <n>. passenger is not listed in response` |
| 54 | APIm/APIw | And | `Mock Check-in Select Request` |
| 54 | APIm/APIw | When | `I send Check-in Select Request` |
| 54 | APIm/APIw | Then | `Verify GetBaggage Response has cabinBaggageInfo hasCabinBaggage as "<param>" for <n>. flight` |
| 53 | APIm/APIw | And | `Mock MyTrips PnrLogin Request` |
| 53 | APIm/APIw | And | `Mock Customer Login Request by context user parameters` |
| 51 | APIm/APIw | When | `I send GetSeatMap Request` |
| 50 | APIm/APIw | * | `MyTrips PnrLogin Request updated by context parameters` |
| 50 | APIm/APIw | When | `I send MyTrips GetFlightList Request` |
| 49 | APIm/APIw | Then | `Verify PaymentSummary Response has status as <n>` |
| 48 | APIm/APIw/Web/rIOS | * | `TripType is ROUND_TRIP` |
| 42 | APIm/APIw | And | `Verify GetBaggage Response has hasCheckinBaggage as "<param>" for <n>. flight` |
| 41 | APIm/APIw | When | `I send GetFlightPassengerDetails Request` |
| 38 | APIm/APIw | And | `I add Cabin Baggage for flight passengers:` |
| 34 | APIm/APIw | And | `I add Extra Baggage for flight passengers:` |
| 33 | APIm | * | `Check-in GetPassengers Request segmentIds:` |
| 33 | APIm | Then | `Verify Check-in GetPassengers Response for content:` |
| 32 | APIm | Then | `Verify Check-in GetFlights Response has status as <n>` |
| 32 | APIm | And | `Verify Check-in GetFlights Response for flights:` |
| 32 | APIm | Then | `Verify Check-in GetPassengers Response has status as <n>` |
| 31 | APIm/APIw | * | `GetUpdatedAvailability Request updated with given filters:` |
| 30 | APIw | * | `Availability currencyCode is "<param>"` |
| 30 | APIm/APIw | * | `ModifyPassengers passengers:` |
| 29 | APIm/APIw | And | `Mock GetSeatMap Request` |
| 29 | APIm/APIw | And | `I send Check-in GetPrimaryGroups Request` |
| 28 | APIm/APIw | And | `Mock Check-in GetPrimaryGroups Request for <n>. passenger with nationality "<param>"` |
| 28 | APIm/APIw | And | `Mock MyTrips CalculateCancel Request` |
| 28 | APIm/APIw | When | `I send MyTrips CalculateCancel Request` |
| 27 | APIw | And | `Verify GetBookingDetails Response for packageNames:` |
| 26 | APIm/APIw | And | `Mock MyTrips PnrLogin Request with created PNR info` |
| 24 | APIm/APIw | And | `Verify PaymentSummary Response needPayment as false` |
| 23 | APIm/APIw | And | `Mock MyTrips SetFlightsForReissue Request` |
| 23 | APIm/APIw | When | `I send MyTrips SetFlightsForReissue Request` |
| 23 | APIm/APIw | Then | `Verify GetBookingDetails Response has status as <n>` |
| 23 | APIm/APIw | When | `I send MyTrips PersistCancel Request` |
| 23 | APIm/APIw | Then | `Verify MyTrips PersistCancel Response has status as <n>` |
| 23 | APIm/APIw | And | `Verify MyTrips PersistCancel Response has isSuccess as true` |
| 22 | APIw | Then | `Verify CreateBooking Response` |
| 22 | APIm/APIw | And | `Mock GetSeatMap for flight-segment passengers:` |
| 22 | APIm/APIw | And | `I assign seats for passengers:` |
| 22 | APIm/APIw | And | `Verify PaymentSummary Response has correct amount for "<param>"` |
| 21 | APIm/APIw | When | `I send MyTrips InitializeForSearch Request` |
| 21 | APIm/APIw | And | `Verify GetBookingDetails Response has needPayment as true` |
| 21 | APIm/APIw | When | `I send GetCipLounge Request` |
| 20 | APIm/APIw | And | `I send Check-in Initialize Request` |
| 20 | APIm/APIw | When | `I send GetSportEquipment Request` |
| 19 | APIm/APIw | And | `Mock AssignSeat Request` |
| 19 | APIm/APIw | When | `I send AssignSeat Request` |
| 19 | APIm/APIw | And | `Mock GetAvailabilityForReissue Request` |
| 19 | APIm/APIw | * | `AvailabilityForReissue flights:` |
| 19 | APIm/APIw | When | `I send GetAvailabilityForReissue Request` |
| 19 | APIm/APIw | Then | `Verify Check-in GetSummary Response has status as <n>` |
| 18 | APIm/APIw | * | `Check-in Select Request passengerIds set as:` |
| 18 | APIw | When | `I send GetAvailableSsr Request` |
| 18 | APIw | * | `GetUpdatedAvailability Request updated with "<param>" package` |
| 17 | APIw | And | `Verify PaymentSummary Response <n>. flight has flightType as "<param>"` |
| 17 | APIw | Then | `Verify ModifyPassengers Response has messages:` |
| 16 | APIm/APIw | Then | `Verify AssignSeat Response has status as <n>` |
| 16 | APIm/APIw | Then | `Verify MyTrips PnrLogin Response has status as <n>` |
| 16 | APIw | Then | `Verify Availability Response has status as <n>` |
| 16 | APIm/APIw | And | `Mock Check-in SaveApisForm Request` |
| 16 | APIm/APIw | And | `Mock Check-in PassengerApisCheck Request for <n>. selected passenger` |
| 16 | APIm/APIw | And | `I send Check-in PassengerApisCheck Request` |
| 16 | APIm/APIw | And | `Verify Check-in PassengerApisCheck Response has isSuccess as true` |
| 16 | APIm/APIw | When | `I send Check-in SaveApisForm Request` |
| 16 | APIm/APIw | When | `I send Customer Retrieve Request` |
| 16 | APIm/APIw | When | `Mock AddSportEquipment Request` |
| 16 | APIm/APIw | When | `I send AddSportEquipment Request` |
| 16 | APIm/APIw | Then | `Verify Check-in GetSummary Response has "<param>" SSR for segment passengers:` |
| 15 | APIm/APIw | When | `I send ModifyBaggage Request` |
| 15 | APIw | And | `Verify PaymentSummary Response flowType as "<param>"` |
| 15 | APIw | And | `Verify PaymentSummary Response LastPaymentInfo has currency as "<param>"` |
| 15 | APIw | And | `Verify PaymentSummary Response LastPaymentInfo has state as "<param>"` |
| 15 | APIw | And | `Verify PaymentSummary Response LastPaymentInfo has isSuccess as true` |
| 15 | APIm/APIw | Given | `Mock Customer Login Request by consul with user "<param>"` |
| 15 | APIm | When | `I send MyTrips GetReservationList Request` |
| 15 | APIm/APIw | When | `I send SeatMap PnrLogin Request` |
| 15 | APIw | And | `Verify GetBookingDetails Response has correct amount for "<param>"` |
| 15 | APIm/APIw | Then | `Verify PaymentSummary Response lastPaymentInfo:` |
| 15 | APIm/APIw | And | `Verify GetBookingDetails Response PriceInfo Additional Prices has details:` |
| 15 | APIm/APIw | Then | `Verify AddSportEquipment Response has status as <n>` |
| 14 | APIm/APIw | * | `Select all flights for reissue` |
| 14 | APIm/APIw | * | `AvailabilityForReissue tripType is ROUND_TRIP` |
| 14 | APIm/APIw | And | `Mock ModifyBaggage Request` |
| 14 | APIm/APIw | Then | `Verify GetBaggage Response` |
| 14 | APIw | And | `Verify PaymentSummary Response <n>. passenger has passengerType as ADLT` |
| 14 | APIm/APIw | When | `I send Customer GetTravelerList Request` |
| 14 | APIm/APIw | When | `Mock SeatMap PnrLogin Request` |
| 14 | APIm/APIw | * | `AddSportEquipment Request equipment parameters:` |
| 13 | APIw | When | `I send GetMeal Request` |
| 13 | APIm/APIw | When | `I send PassengerCheck Request` |
| 13 | APIm/APIw | Then | `Verify PassengerCheck Response has status as <n>` |
| 13 | APIm/APIw | And | `Verify PassengerCheck Response has messages:` |
| 12 | APIm/APIw | * | `AssignSeat Request seatNumber is updated by random seat selection` |
| 12 | APIm/APIw | When | `I send Enroll Request` |
| 12 | APIm | Then | `Verify MyTrips GetReservationList Response has status as <n>` |
| 12 | APIm | And | `Verify MyTrips GetReservationList Response has futureReservations list` |
| 12 | APIm/APIw | When | `Mock Baggage PnrLogin Request` |
| 12 | APIm/APIw | When | `I send Baggage PnrLogin Request` |
| 12 | APIw/Web | * | `Saved passenger:` |
| 11 | APIw | And | `Verify PaymentSummary Response tripType as ONE_WAY` |
| 11 | APIw | And | `Verify MyTrips CalculateReissue Response passengerTypeCount includes "<param>"` |
| 11 | APIm/APIw | Then | `Verify GetBaggage Response has passenger details:` |
| 11 | APIm | Then | `Verify MyTrips GetReservationList Response has saved PNR Information in futureReservations list` |
| 11 | APIm/APIw | When | `Mock AddCipLounge Request` |
| 11 | APIm/APIw | When | `I send AddCipLounge Request` |
| 11 | APIm/APIw | And | `Mock Customer AddTraveler Request:` |
| 11 | APIm/APIw | When | `I send Customer AddTraveler Request` |
| 10 | APIm/APIw | And | `Verify AssignSeat Response selectedSeats contains requested seatNumber` |
| 10 | APIm/APIw | And | `Mock GetUpdatedReissueAvailability Request with given filters:` |
| 10 | APIm/APIw | When | `I send GetUpdatedReissueAvailability Request` |
| 10 | APIw | And | `Mock GetSelectedMeal Request` |
| 10 | APIw | When | `I send GetSelectedMeal Request` |
| 10 | APIm/APIw | And | `Verify PaymentSummary Response PriceInfo Additional Prices has details:` |
| 10 | APIm/APIw | And | `Verify PaymentSummary Response needPayment as true` |
| 10 | APIw/Web | * | `User attributes:` |
| 10 | APIw | And | `Verify GetPassengers Response for <n>. passenger nationalityType is DOMESTIC` |
| 10 | APIw | And | `Verify StatusByPort Response has messages:` |
| 9 | APIw | And | `Verify GetBookingDetails Response has contactInfo as null` |
| 9 | APIw | And | `Verify Availability Response has journeyType as OUTBOUND` |
| 9 | APIw | And | `Verify Availability Response has currencyCode as "<param>"` |
| 9 | APIm | And | `Mock Add Seat Type for flight-segment passengers:` |
| 9 | APIw | When | `I send CheckMs Request` |
| 9 | APIw | Then | `Verify CheckMs Response has status as <n>` |
| 8 | APIm/APIw | * | `SeatMap PnrLogin Request updated by context parameters` |
| 8 | APIm | Then | `Verify SeatMap PnrLogin Response has status as <n>` |
| 8 | APIm/APIw | And | `Verify Check-in GetSummary Response for segments;` |
| 8 | APIm/APIw | And | `Verify Check-in GetSummary Response has passengerTypeCount as "<param>"` |
| 8 | APIm | And | `Mock SetPromotion Request` |
| 8 | APIm | When | `I send SetPromotion Request` |
| 8 | APIm/APIw | Then | `Verify GetFlightPassengerDetails Response has status as <n>` |
| 8 | APIw | And | `Verify CheckMs Response has messages:` |
| 8 | APIw | And | `Verify GetBaggage Response has routeType as "<param>" for <n>. flight` |
| 8 | APIm/APIw | Given | `Mock StatusByPort Request` |
| 8 | APIm/APIw | * | `StatusByPort Request parameters:` |
| 8 | APIm/APIw | When | `I send StatusByPort Request` |
| 8 | APIm/APIw | Then | `Verify StatusByPort Response status is <n>` |
| 7 | APIw | And | `Verify AssignSeat Response selectedSeats has isChangeable as true for requestedSeat` |
| 7 | APIw | And | `Verify GetAvailabilityForReissue Response has code for originLocation as "<param>"` |
| 7 | APIw | And | `Verify GetAvailabilityForReissue Response has code for destinationLocation as "<param>"` |
| 7 | APIm | Given | `Mock Check-in TicketLogin Request` |
| 7 | APIm | When | `I send Check-in TicketLogin Request` |
| 7 | APIm | Then | `Verify Check-in TicketLogin Response has status as <n>` |
| 7 | APIm/APIw | Given | `Mock Enroll Request` |
| 7 | APIm/APIw | And | `Verify GetBookingDetails Response has needPayment as false` |
| 7 | APIm | And | `Mock Check-in SendBoardingPass Request` |
| 7 | APIm | When | `I send Check-in SendBoardingPass Request` |
| 7 | APIm | Then | `Verify Check-in SendBoardingPass Response has status as <n>` |
| 7 | APIw | Then | `Verify ModifyPassengers Response` |
| 7 | APIm | When | `I send AddCabinBaggage Request` |
| 7 | APIw | Then | `Verify GetAvailableSsr Response has ssrList:` |
| 7 | APIw | And | `Verify GetMeal Response <n>. Flight and <n>. Segment menu list is not empty` |
| 7 | APIm/APIw | Then | `Verify GetCipLounge Response` |
| 7 | APIm | Given | `Mock AddFeedback Request with following details:` |
| 7 | APIm | When | `I send AddFeedback Request` |
| 7 | APIm | Then | `Verify AddFeedback Response has status as <n>` |
| 7 | APIm | And | `Verify AddFeedback Response has webRequestSeq is not null` |
| 7 | APIm | And | `Verify AddFeedback Response has email is valid` |
| 6 | APIw | And | `Verify GetBookingDetails Response has <n> passenger with typeCode as ADLT` |
| 6 | APIw | When | `Mock ModifyMeal Request` |
| 6 | APIw | And | `I send ModifyMeal Request` |
| 6 | APIm | * | `CurrencyCode is "<param>"` |
| 6 | APIw | And | `Mock MyTrips CalculateReissue Request by given flight filters:` |
| 6 | APIw | When | `I send MyTrips CalculateReissue Request` |
| 6 | APIm | And | `Mock Customer VerifyTravelerDiscount Request by context user parameters` |
| 6 | APIm | When | `I send Customer VerifyTravelerDiscount Request` |
| 6 | APIm | Then | `Verify Customer VerifyTravelerDiscount Response has status as <n>` |
| 6 | APIm/APIw | And | `Verify Check-in GetSummary Response has needPayment as true` |
| 6 | APIm/APIw | Then | `Verify GetSeatMap Response has status as <n>` |
| 6 | APIw | And | `I set SetCurrency currencyCode as "<param>"` |
| 6 | APIw | When | `I send SetCurrency Request` |
| 6 | APIw | Then | `Verify Check-in GetPrimaryGroups Response for <n>. passenger Information` |
| 6 | APIm/APIw | And | `Verify Check-in GetSummary Response has needPayment as false` |
| 6 | APIm/APIw | Then | `Verify Customer Login Response has status as <n>` |
| 6 | APIm | And | `Mock AddCabinBaggage Request` |
| 6 | APIm/APIw | Given | `Mock StatusByFlightNumber Request` |
| 6 | APIm/APIw | */When | `StatusByFlightNumber Request parameters:` |
| 6 | APIm/APIw | When | `I send StatusByFlightNumber Request` |
| 6 | APIm/APIw | Then | `Verify StatusByFlightNumber Response status is <n>` |
| 6 | APIm | And | `I remove authorization headers from the context if it is exist` |
| 6 | APIm | When | `Mock Customer ValidateMissingFlight with saved flight details` |
| 6 | APIm | And | `I send Customer ValidateMissingFlight Request` |
| 6 | APIm | And | `Verify Customer ValidateMissingFlight Response has status as <n>` |
| 6 | APIm | And | `Verify Customer ValidateMissingFlight Response has isSuccess "<param>"` |
| 6 | APIw | Then | `Verify GetPassengers Response has status as <n>` |
| 6 | APIw | And | `Verify GetPassengers Response for all passengers hasInfant is false` |
| 6 | APIw | And | `Verify Availability Response has messages:` |
| 6 | APIm | Given | `Mock CreateCase Request` |
| 6 | APIm | When | `I send CreateCase Request` |
| 5 | APIw | And | `Verify AssignSeat Response selectedSeats isFree as false for requestedSeat` |
| 5 | APIw | And | `Verify AssignSeat Response selectedSeats price currency as "<param>" for requestedSeat` |
| 5 | APIw | And | `Verify GetBookingDetails Response has tripType as ONE_WAY` |
| 5 | APIw | * | `Set <n>. flight's segmentIds for MyTrips SetFlightsForReissue Request` |
| 5 | APIw | * | `AvailabilityForReissue tripType is ONE_WAY` |
| 5 | APIw | Then | `Verify GetAvailabilityForReissue Response status is <n>` |
| 5 | APIw | And | `Verify GetAvailabilityForReissue Response has currency as "<param>"` |
| 5 | APIw | Then | `Verify MyTrips CalculateCancel Response has status as <n>` |
| 5 | APIw | And | `Verify MyTrips CalculateCancel Response has tripType is "<param>"` |
| 5 | APIw | And | `Verify MyTrips CalculateCancel Response has needPayment is false` |
| 5 | APIw | And | `Verify MyTrips CalculateCancel Response has same departure and arrival codes with TDFA response` |
| 5 | APIw | And | `Verify MyTrips CalculateCancel Response has name for brandInfo is "<param>"` |
| 5 | APIw | And | `Verify MyTrips CalculateCancel Response has flightType is "<param>"` |
| 5 | APIw | And | `Verify MyTrips CalculateCancel Response has isConnected is false` |
| 5 | APIw | And | `Verify MyTrips CalculateCancel Response has type for priceInfo is "<param>"` |
| 5 | APIw | Then | `Verify MyTrips CalculateReissue Response has status as <n>` |
| 5 | APIw | And | `Verify MyTrips CalculateReissue Response has type for totalAmount as "<param>"` |
| 5 | APIw | And | `Verify MyTrips CalculateReissue Response has currency for totalAmount as "<param>"` |
| 5 | APIw | And | `Verify MyTrips CalculateReissue Response removedFlights is not null` |
| 5 | APIw | And | `Verify MyTrips CalculateReissue Response addedFlights is not null` |
| 5 | APIm/APIw | Then | `Verify Check-in Select Response has status as <n>` |
| 5 | APIm/APIw | When | `I send Check-in Perform Request` |
| 5 | APIm | And | `Verify Check-in TicketLogin Response has conversationId is not null` |
| 5 | APIm | And | `Verify Check-in TicketLogin Response has currencyCode as "<param>"` |
| 5 | APIm | And | `Verify Check-in TicketLogin Response has isSuccess as true` |
| 5 | APIm | And | `Mock PassengerCheck Request` |
| 5 | APIm | * | `PassengerCheck Request passengerInfo:` |
| 5 | APIm | * | `Check-in SaveApisForm Request formData formGroups updated by:` |
| 5 | APIw | And | `Mock SetCurrency Request` |
| 5 | APIm | * | `Check-in SendBoardingPass Request passengers set as:` |
| 5 | APIm/APIw | And | `Baggage PnrLogin Request bookingId set as <n>. ADLT passenger ticketNumber from context parameters` |
| 5 | APIm/APIw | And | `Baggage PnrLogin Request bookingId-surname set as <n>. ADLT passenger ticketNumber-surname from context parameters` |
| 5 | APIm/APIw | Then | `Verify Check-in GetPassengers Response for passenger types:` |
| 5 | APIw | Then | `Verify MyTrips MyFlightsInfo Response has passengerTypeCount includes "<param>"` |
| 5 | APIm | And | `I set SetPromotion promotionCode by consul with "<param>"` |
| 5 | APIm/APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight and <n>. passenger passengerType is ADLT` |
| 5 | APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight hasTransfer as false` |
| 5 | APIm | And | `Verify SeatMap PnrLogin Response has messages:` |
| 5 | APIm/APIw | When | `I send Cip PnrLogin Request` |
| 5 | APIm/APIw | When | `Mock Cip PnrLogin Request` |
| 5 | APIw | And | `Verify GetAvailableSsr Response has ssrType as "<param>"` |
| 5 | APIw | When | `Mock RemoveSportEquipment Request` |
| 5 | APIw | And | `I send RemoveSportEquipment Request` |
| 5 | APIw | Then | `Verify RemoveSportEquipment Response has status as <n>` |
| 5 | APIw | And | `Verify AddSportEquipment Response has messages:` |
| 5 | APIw | And | `Verify AddSportEquipment Response has content as null` |
| 5 | APIw | Then | `Verify GetUpdatedAvailability Response has status as <n>` |
| 5 | APIw | And | `Verify GetUpdatedAvailability Response has tripType as ROUND_TRIP` |
| 5 | APIw | And | `Verify GetUpdatedAvailability Response has currencyCode as "<param>"` |
| 5 | APIw | And | `Verify GetUpdatedAvailability Response has journeyType as INBOUND` |
| 5 | APIw | Then | `Verify ModifyPassengers Response has status as <n>` |
| 5 | APIm | Given | `Mock Enroll Request:` |
| 5 | APIm | Then | `Verify Enroll Response has status as <n>` |
| 5 | APIm | When | `I send Customer Logout Request` |
| 5 | APIm | Then | `Verify Customer Logout Response has status as <n>` |
| 5 | APIw | And | `Verify GetPassengers Response for <n>. passenger passengerType is ADLT` |
| 5 | APIw | And | `Verify Availability Response has tripType as ROUND_TRIP` |
| 5 | APIm/APIw | And | `Verify StatusByFlightNumber Response has messages:` |
| 5 | APIm/APIw | Given | `Mock StatusByRoute Request` |
| 5 | APIm/APIw | * | `StatusByRoute Request parameters:` |
| 5 | APIm/APIw | When | `I send StatusByRoute Request` |
| 5 | APIm/APIw | Then | `Verify StatusByRoute Response status is <n>` |
| 5 | APIw | When | `Mock Customer UpdateTraveler Request` |
| 5 | APIw | And | `I send Customer UpdateTraveler Request` |
| 5 | APIw | Then | `Verify Customer UpdateTraveler Response has status as <n>` |
| 5 | APIm | When | `I send GetCategoryDetail Request` |
| 5 | APIm | Then | `Verify GetCategoryDetail Response has status as <n>` |
| 5 | APIm | And | `Verify GetCategoryDetail Response subjects are valid` |
| 4 | APIw | * | `ModifyMeal Request mealCode is "<param>"` |
| 4 | APIw | * | `ModifyMeal Request segmentId is <n>. Flight <n>. Segment` |
| 4 | APIw | * | `ModifyMeal Request passengers:` |
| 4 | APIm | Then | `Verify Check-in PnrLogin Response for isSuccess is true` |
| 4 | APIm | And | `Verify Check-in PnrLogin Response for isGroup is false` |
| 4 | APIm | And | `Verify Check-in PnrLogin Response for currencyCode as "<param>"` |
| 4 | APIm | And | `Verify Check-in PnrLogin Response for conversationId is not null` |
| 4 | APIw | And | `Verify Availability Response has tripType as ONE_WAY` |
| 4 | APIw | And | `Verify Check-in GetFlights Response for <n>. Flight has isElligibleForCheckIn is true` |
| 4 | APIw | And | `Verify Check-in GetFlights Response for <n>. Flight has passengerCheckInStatus is "<param>"` |
| 4 | APIw | And | `Verify Check-in GetFlights Response for <n>. Flight has isBoardingCardPrintable is false` |
| 4 | APIw | And | `Verify Check-in GetFlights Response for <n>. Flight has reason is null` |
| 4 | APIw | And | `Verify GetAvailabilityForReissue Response has conversationId as null` |
| 4 | APIw | And | `Verify GetAvailabilityForReissue Response has journeyType as OUTBOUND` |
| 4 | APIw | And | `Verify MyTrips CalculateCancel Response has priceInfo title as "<param>"` |
| 4 | APIm | And | `Mock Customer VerifyDiscount Request` |
| 4 | APIm | When | `I send Customer VerifyDiscount Request` |
| 4 | APIm | Then | `Verify Customer VerifyDiscount Response has status as <n>` |
| 4 | APIm | And | `Check-in TicketLogin Request ticket numbers set for <n>. passenger by context parameters` |
| 4 | APIw | Then | `Verify GetSportEquipment Response <n>. Flight has hasTransfer is false` |
| 4 | APIw | And | `Verify GetSportEquipment Response <n>. Flight and <n>. Passenger for passengerType is ADLT` |
| 4 | APIw | And | `Verify GetSportEquipment Response <n>. Flight departureInformation code is "<param>"` |
| 4 | APIw | And | `Verify GetSportEquipment Response <n>. Flight arrivalInformation code is "<param>"` |
| 4 | APIw | And | `Verify GetSportEquipment Response <n>. Flight sportEquipments list is not empty` |
| 4 | APIw | And | `Verify GetSportEquipment Response <n>. Flight sportEquipments list for all items price currency is "<param>"` |
| 4 | APIw | And | `Mock Customer Activate Request` |
| 4 | APIw | And | `Customer Activate Request activationCode set as "<param>"` |
| 4 | APIw | When | `I send Customer Activate Request` |
| 4 | APIm | And | `Verify Customer VerifyTravelerDiscount Response has messages:` |
| 4 | APIm/APIw | And | `Verify GetBookingDetails Response has title as "<param>" in Prices` |
| 4 | APIm | And | `Verify Check-in SendBoardingPass Response has isSuccess as true` |
| 4 | APIm | And | `Verify PaymentSummary Response has special requests:` |
| 4 | APIm | Then | `Verify MyTrips MyFlightsInfo Response has special requests:` |
| 4 | APIm/APIw | Then | `Verify ModifyBaggage Response` |
| 4 | APIm | Then | `Verify Availability Response has notes:` |
| 4 | APIw | And | `Mock RemoveSeat Request` |
| 4 | APIw | When | `I send RemoveSeat Request` |
| 4 | APIw | And | `Verify PaymentSummary Response tripType as ROUND_TRIP` |
| 4 | APIw | And | `Verify MyTrips SetFlightsForReissue Response has passengers as "<param>"` |
| 4 | APIm/APIw | And | `Verify Customer Login Response has accessToken is not null` |
| 4 | APIm/APIw | And | `Verify PassengerCheck Response has isSuccess as true` |
| 4 | APIm/APIw | And | `Verify PassengerCheck Response has isValidToContinue as true` |
| 4 | APIm | And | `Verify PassengerCheck Response has isSuccess as false` |
| 4 | APIm | And | `Verify PassengerCheck Response has isValidToContinue as false` |
| 4 | APIw | Then | `Verify Availability Response has isEligibleForRefund as expected based on refund threshold` |
| 4 | APIm | Then | `Verify SetPromotion Response has status as <n>` |
| 4 | APIm/APIw | And | `Verify Check-in GetSummary Response has lastPaymentInfo:` |
| 4 | Web | And | `I select the 1st flight on Flight Cancel page` |
| 4 | APIw | And | `Verify GetBookingDetails Response has tripType as ROUND_TRIP` |
| 4 | APIw | And | `GetSelectedMeal Request mealCode is "<param>"` |
| 4 | APIw | Then | `Verify GetSelectedMeal Request has code as "<param>"` |
| 4 | APIw | And | `Verify GetSelectedMeal Request has title as "<param>"` |
| 4 | APIw | And | `Verify GetSelectedMeal Request has description as "<param>"` |
| 4 | APIw | And | `Verify GetSelectedMeal Request has currency as "<param>"` |
| 4 | APIw | And | `Verify MyTrips InitializeForSearch Response has passengers as "<param>"` |
| 4 | APIw | Then | `Verify GetAvailableSsr Response has status as <n>` |
| 4 | APIm | Then | `Verify AddCabinBaggage Response has status as <n>` |
| 4 | APIm | And | `Verify AddCabinBaggage Response has isSuccess as true` |
| 4 | APIw | And | `Verify RemoveSportEquipment Response has messages:` |
| 4 | APIw | And | `Verify RemoveSportEquipment Response has content as null` |
| 4 | APIw | And | `Verify GetPassengers Response has flightType as DOMESTIC` |
| 4 | APIw | When | `I send GetWheelChair Request` |
| 4 | APIm | And | `Mock Customer Logout Request` |
| 4 | APIm | And | `Verify Customer Logout Response has isSuccess as true` |
| 4 | APIm/APIw | And | `Mock Customer UpdateEmailContact Request` |
| 4 | APIm/APIw | When | `I send Customer UpdateEmailContact Request` |
| 4 | APIm/APIw | Then | `Verify Customer UpdateEmailContact Response has status as <n>` |
| 4 | APIw | And | `Verify Customer UpdateTraveler Response has messages:` |
| 3 | APIw | And | `Mock RemoveBaggage Request` |
| 3 | APIw | When | `I send RemoveBaggage Request` |
| 3 | APIw | And | `Verify GetBaggage Response offers price currency is "<param>"` |
| 3 | APIw | And | `Verify GetBookingDetails Response has priceInfo with totalAmount currency as "<param>"` |
| 3 | APIw | And | `Verify GetBookingDetails Response has <n> passenger with typeCode as INFT` |
| 3 | APIw | And | `Verify GetAvailabilityForReissue Response has tripType as ONE_WAY` |
| 3 | APIw | And | `Verify MyTrips CalculateCancel Response has passengers:` |
| 3 | APIm/APIw | And | `Verify Check-in Select Response has apisRequired as true` |
| 3 | APIm/APIw | And | `Verify Check-in Select Response has list that contains all passenger Id's in the request` |
| 3 | APIm/APIw | And | `Verify Check-in Select Response for passenger Information match with GetPassenger Response` |
| 3 | APIm | And | `Set Customer VerifyDiscount discountType as "<param>"` |
| 3 | APIw | Then | `Verify ModifyMeal Response has status as <n>` |
| 3 | APIw | And | `Verify ModifyMeal Response has messages:` |
| 3 | APIw | * | `AssignSeat Request seatNumber is updated by a seat from STANDARD seatGroup` |
| 3 | APIw | And | `Verify AssignSeat Response has messages:` |
| 3 | APIm | And | `Mock MyTrips GetFlightEvaluation Request` |
| 3 | APIm | When | `I send MyTrips GetFlightEvaluation Request` |
| 3 | APIm/APIw | Given | `Mock ForgotPasswordEmail Request` |
| 3 | APIm/APIw | When | `I send ForgotPasswordEmail Request` |
| 3 | APIm | And | `Verify Check-in GetFlights Response for segments:` |
| 3 | APIm/APIw | Then | `Verify Check-in SaveApisForm Response has status as <n>` |
| 3 | APIm | And | `Mock Customer Auth ResendOtp Request` |
| 3 | APIm | When | `I send Customer Auth ResendOtp Request` |
| 3 | APIm | Then | `Verify Customer Auth ResendOtp Response has status as <n>` |
| 3 | APIm | When | `Mock Meal PnrLogin Request` |
| 3 | APIm | When | `I send Meal PnrLogin Request` |
| 3 | APIm | Then | `Verify Meal PnrLogin Response has status as <n>` |
| 3 | APIm/APIw | * | `AssignSeat Request passengerId updated with <n>. Passenger Id` |
| 3 | APIm | When | `Mock SportEquipment PnrLogin Request` |
| 3 | APIm | When | `I send SportEquipment PnrLogin Request` |
| 3 | APIm | Then | `Verify SportEquipment PnrLogin Response has status as <n>` |
| 3 | APIm/APIw | When | `Mock Check-in GetBoardingPass Request` |
| 3 | APIm/APIw | When | `I send Check-in GetBoardingPass Request` |
| 3 | APIm/APIw | Then | `Verify Check-in GetBoardingPass Response has status as <n>` |
| 3 | APIw | And | `Verify MyTrips MyFlightsInfo Response has same departure and arrival codes with TDFA response` |
| 3 | APIw | And | `Verify MyTrips MyFlightsInfo Response has name for brandInfo is "<param>"` |
| 3 | APIw | And | `Verify Check-in GetPrimaryGroups Response has checkSecondaryGroup as false` |
| 3 | APIw | And | `Verify Check-in GetPrimaryGroups Response has checkSecondaryGroup as true` |
| 3 | APIw | And | `Verify Check-in GetPrimaryGroups Response has fieldGroups that contains groupId as "<param>"` |
| 3 | APIw | And | `Verify Check-in GetSummary Response <n>. passenger has isBoardingCardPrintable is false` |
| 3 | APIw | Then | `Verify RemoveSeat Response has status as <n>` |
| 3 | APIw | And | `Verify RemoveSeat Response has type as "<param>"` |
| 3 | APIw | And | `Verify RemoveSeat Response has code <n>` |
| 3 | APIw | And | `Verify RemoveSeat Response has "<param>"` |
| 3 | APIw | And | `Verify RemoveSeat Response has content as null` |
| 3 | APIm/APIw | Then | `Verify Baggage PnrLogin Response has status as <n>` |
| 3 | APIw | And | `I set MyTrips CheckActivationCode Request with activationCode: "<param>"` |
| 3 | APIm | And | `I select <n> passengers for Check-in Select Request` |
| 3 | APIm/APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight hasTransfer as true` |
| 3 | APIm | And | `Verify Check-in SendBoardingPass Response has messageResponses:` |
| 3 | APIm/APIw | When | `I send RemoveCabinBaggage Request` |
| 3 | APIw | And | `Verify GetFlightPassengerDetails Response has hasBundleSeat as true` |
| 3 | APIw | Then | `Verify GetMeal Response` |
| 3 | APIw | And | `Verify GetFlightPassengerDetails Response has hasBundleSeat as false` |
| 3 | Web | And | `I paste the URL I copied into a new tab in my browser` |
| 3 | APIw | And | `Verify GetSeatMap Response has messages:` |
| 3 | APIw | * | `RemoveSportEquipment Request equipment parameters:` |
| 3 | APIw | And | `Verify GetCipLounge Response for all loungeDetails price currency is "<param>"` |
| 3 | APIm | And | `Verify SetPromotion Response has messages:` |
| 3 | APIw | And | `Mock UpdatePassword Request` |
| 3 | APIw | And | `Set Customer UpdatePassword Request new password as "<param>"` |
| 3 | APIw | And | `I send UpdatePassword Request` |
| 3 | APIw | And | `Verify Customer UpdatePassword Response has messages:` |
| 3 | APIw | Then | `Verify GetWheelChair Response has flight list as not null` |
| 3 | APIw | And | `Verify GetPassengers Response has <n> passenger that passengerType is ADLT` |
| 3 | APIw | And | `Verify GetCurrencyList Response has CurrencyResponse with code "<param>"` |
| 3 | APIw | And | `Mock RemoveCipLounge Request` |
| 3 | APIw | When | `I send RemoveCipLounge Request` |
| 3 | APIm | Then | `Verify Cip PnrLogin Response has status as <n>` |
| 3 | APIm/APIw | And | `Mock Customer UpdatePhoneContact Request` |
| 3 | APIm/APIw | When | `I send Customer UpdatePhoneContact Request` |
| 3 | APIm/APIw | Then | `Verify Customer UpdatePhoneContact Response has status as <n>` |
| 3 | APIm | And | `Verify Enroll Response has messages:` |
| 3 | APIw | When | `Mock Customer DeleteTraveler Request` |
| 3 | APIw | And | `I send Customer DeleteTraveler Request` |
| 3 | APIw | Then | `Verify Customer DeleteTraveler Response has status as <n>` |
| 2 | APIw | Then | `Verify GetSeatMap Response` |
| 2 | APIw | Then | `Verify GetUpdatedReissueAvailability Response status is <n>` |
| 2 | APIw | And | `Verify GetUpdatedReissueAvailability Response has tripType as ROUND_TRIP` |
| 2 | APIw | And | `Verify GetUpdatedReissueAvailability Response has currency as "<param>"` |
| 2 | APIw | And | `Verify GetUpdatedReissueAvailability Response has journeyType as INBOUND` |
| 2 | APIw | Then | `Verify ModifyMeal Response` |
| 2 | APIw | And | `Verify ModifyMeal Response has mealCode as "<param>"` |
| 2 | APIw | And | `Verify ModifyMeal Response has selectedCount as <n>` |
| 2 | APIw | And | `Verify ModifyMeal Response has <n> selectedPassenger` |
| 2 | APIw | And | `Verify Check-in GetSecondaryGroups Response for group "<param>" has fields:` |
| 2 | APIw | And | `Verify GetAvailabilityForReissue Response has tripType as ROUND_TRIP` |
| 2 | APIw | And | `Verify MyTrips CalculateCancel Response has currency for priceInfo is "<param>"` |
| 2 | APIw | Then | `Verify Check-in Perform Response has status as <n>` |
| 2 | APIw | And | `Verify Check-in Perform Response has isSuccess as true` |
| 2 | APIw | And | `Verify Check-in Select Response has messageResponses:` |
| 2 | APIm | And | `Mock Customer Update Request` |
| 2 | APIm | And | `I set Customer Update Request with Login User Info and valid TCKN` |
| 2 | APIm | And | `I send Customer Update Request` |
| 2 | APIw | And | `Verify ModifyMeal Response has content as null` |
| 2 | APIw | And | `Verify AssignSeat Response has content as null` |
| 2 | APIm | Then | `Verify MyTrips GetFlightEvaluation Response has status as <n>` |
| 2 | APIm | When | `I add boarding pass to wallet for segment passengers:` |
| 2 | APIm | Then | `Verify Check-in GetAppleBoardingPass Response has status as <n>` |
| 2 | APIm | And | `Verify Check-in GetAppleBoardingPass Response has content is not null` |
| 2 | APIm | And | `Verify Customer Auth ResendOtp Response has messages:` |
| 2 | APIm | And | `Verify Meal PnrLogin Response has conversationId is not null` |
| 2 | APIm | And | `Verify SeatMap PnrLogin Response has conversationId is not null` |
| 2 | APIm | And | `Verify SportEquipment PnrLogin Response has conversationId is not null` |
| 2 | APIw | And | `Verify PaymentSummary Response has title as "<param>" in Prices` |
| 2 | APIm | And | `Verify GetBaggage Response has <n> passenger quantity` |
| 2 | APIm/APIw | And | `Verify Check-in GetBoardingPass Response boardingPass fields by TDFA Response for flight-segment-passengers:` |
| 2 | APIw | And | `I add Cip Lounge for flight-segment passengers:` |
| 2 | APIw | And | `Verify PaymentSummary Response <n>. passenger has passengerType as INFT` |
| 2 | APIw | * | `AssignSeat Request segmentId updated with <n>. Flight <n>. Segment Id` |
| 2 | APIm | Then | `Verify Check-in PnrLogin Response has status as <n>` |
| 2 | APIm | And | `Verify Check-in PnrLogin Response has messages:` |
| 2 | APIw | Then | `Verify MyTrips SetFlightsForReissue Response has status as <n>` |
| 2 | APIw | And | `Verify MyTrips SetFlightsForReissue Response has tripType as "<param>"` |
| 2 | APIw | And | `Verify MyTrips SetFlightForReissue Response has same departure and arrival codes with TDFA response` |
| 2 | APIw | And | `Verify MyTrips MyFlightsInfo Response has flightType is "<param>"` |
| 2 | APIw | And | `Verify MyTrips PnrLogin Response has messages:` |
| 2 | APIw | Then | `Verify MyTrips CheckActivationCode Response has messages:` |
| 2 | APIw | And | `Mock MyTrips UpsertMailSmsConsent Request` |
| 2 | APIw | When | `I send MyTrips UpsertMailSmsConsent Request` |
| 2 | APIw | Then | `Verify MyTrips UpsertMailSmsConsent Response has status as <n>` |
| 2 | APIw | And | `Verify MyTrips UpsertMailSmsConsent Response has isSuccess as true` |
| 2 | APIw | And | `Verify Check-in SaveApisForm Response has isSuccess as true` |
| 2 | APIw | And | `Verify Check-in GetSummary Response has lastPaymentInfo as null` |
| 2 | APIw | And | `Mock MyTrips UpdateMemberShipId Request` |
| 2 | APIw | When | `I send MyTrips UpdateMemberShipId Request` |
| 2 | APIw | Then | `Verify MyTrips GetFlightList Response has conversationId is null` |
| 2 | APIw | And | `Verify MyTrips GetFlightList Response passengerTypeCount includes "<param>"` |
| 2 | APIw | And | `Verify MyTrips GetFlightList Response has same departure and arrival codes with TDFA response` |
| 2 | APIw | And | `Verify MyTrips GetFlightList Response has name for brandInfo is "<param>"` |
| 2 | APIw | And | `Verify MyTrips GetFlightList Response has flightType is "<param>"` |
| 2 | APIw | And | `Verify MyTrips GetFlightList Response has isConnected is false` |
| 2 | APIm | * | `Baggage PnrLogin Request updated by context parameters` |
| 2 | APIm/APIw | And | `Verify Baggage PnrLogin Response has conversationId is not null` |
| 2 | APIw | Then | `Verify MyTrips CheckActivationCode Response has messageResponses:` |
| 2 | APIw | Then | `Verify GetAvailabilityForReissue Response has isEligibleForRefund as expected based on refund threshold` |
| 2 | APIw | Then | `Verify GetUpdatedReissueAvailability Response has isEligibleForRefund as expected based on refund threshold` |
| 2 | APIm | And | `Verify GetFlightPassengerDetails Response for <n>. flight has <n> passenger quantity` |
| 2 | APIw | And | `Verify GetBookingDetails Response has not title as "<param>" in Prices` |
| 2 | APIm/APIw | And | `Mock RemoveCabinBaggage Request for <n>. Flight <n>. Passenger` |
| 2 | APIm | Then | `Verify RemoveCabinBaggage Response` |
| 2 | APIm | And | `Baggage PnrLogin Request bookingId-surname set from Payment Response` |
| 2 | Web | * | `Check-In Baggage:` |
| 2 | Web | Then | `Verify that Book Flights to <param> Page URL is correct` |
| 2 | Web | And | `Verify that Book Flights to <param> Page title is displayed` |
| 2 | APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight and <n>. passenger passengerType is SLDD` |
| 2 | APIw | And | `Verify GetMeal Response <n>. Flight is connected` |
| 2 | APIw | Then | `Verify MyTrips InitializeForSearch Response has status as <n>` |
| 2 | APIw | And | `Verify MyTrips InitializeForSearch Response has tripType as "<param>"` |
| 2 | APIw | And | `Verify MyTrips InitializeForSearch Response has same departure and arrival codes with TDFA response` |
| 2 | APIw | And | `Verify AssignSeat Response selectedSeats isFree as true for requestedSeat` |
| 2 | APIw | And | `Verify AssignSeat Response selectedSeats price is null for requestedSeat` |
| 2 | APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight and <n>. passenger passengerType is TEAC` |
| 2 | APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight and <n>. passenger passengerType is STDT` |
| 2 | APIw | And | `Mock Cip PnrLogin Request with created Pnr info` |
| 2 | APIw | And | `Verify GetAvailableSsr Response has not ssrType as "<param>"` |
| 2 | APIm | And | `I add CIP Lounge for segment passengers:` |
| 2 | APIw | * | `GetSeatMap Request passengerId is null` |
| 2 | APIm | And | `Mock RemovePromotion Request` |
| 2 | APIm | When | `I send RemovePromotion Request` |
| 2 | APIm | Then | `Verify RemovePromotion Response has status as <n>` |
| 2 | APIm | And | `I set SetPromotion promotionCode as "<param>"` |
| 2 | APIw | * | `GetSeatMap Request segmentId is null` |
| 2 | APIw | Then | `Verify RemoveBaggage Response has status as <n>` |
| 2 | APIw | And | `Verify RemoveBaggage Response has messages:` |
| 2 | APIw | And | `Verify RemoveBaggage Response has content as null` |
| 2 | APIw | Then | `Verify ModifyBaggage Response has status as <n>` |
| 2 | APIw | And | `Verify ModifyBaggage Response has messages:` |
| 2 | APIw | And | `Verify ModifyBaggage Response has content as null` |
| 2 | APIw | And | `Verify CheckMs Response has isSuccess as false` |
| 2 | APIw | And | `Verify GetWheelChair Response <n>. Flight hasWheelChair is not "<param>"` |
| 2 | APIm/APIw | Then | `Verify AddCipLounge Response` |
| 2 | APIm | And | `Verify Cip PnrLogin Response has conversationId is not null` |
| 2 | APIw | Then | `Verify RemoveCipLounge Response has status as <n>` |
| 2 | APIw | And | `Verify RemoveCipLounge Response has messages:` |
| 2 | APIw | And | `Verify RemoveCipLounge Response has content as null` |
| 2 | APIw | Then | `Verify AddCipLounge Response has status as <n>` |
| 2 | APIw | And | `Verify AddCipLounge Response has messages:` |
| 2 | APIw | And | `Verify AddCipLounge Response has content as null` |
| 2 | APIw | Then | `Verify GetUpdatedAvailability Response has isEligibleForRefund as expected based on refund threshold` |
| 2 | APIw | Given | `Mock GetCheapestFlights Request` |
| 2 | APIw | * | `GetCheapestFlights flights:` |
| 2 | APIw | * | `GetCheapestFlights dateOffset is <n>` |
| 2 | APIw | When | `I send GetCheapestFlights Request` |
| 2 | APIw | Then | `Verify GetCheapestFlights Response has tripType as ONE_WAY` |
| 2 | APIw | And | `Verify GetCheapestFlights Response <n>. Flight has journeyType as "<param>"` |
| 2 | APIw | And | `Verify GetCheapestFlights Response <n>. Flight has planningDate same as Requested Date` |
| 2 | APIw | And | `Verify GetCheapestFlights Response <n>. Flight prices has currency as "<param>"` |
| 2 | APIw | And | `Verify GetCheapestFlights Response <n>. Flight prices departureDates has <n> day offset for planningDate` |
| 2 | APIm | And | `Verify Check-in TicketLogin Response has messages:` |
| 2 | APIw | And | `Verify GetPassengers Response has flightType as INTERNATIONAL` |
| 2 | APIw | And | `Verify GetPassengers Response has <n> passenger that passengerType is INFT` |
| 2 | APIw | And | `Verify GetPassengers Response for <n>. passenger passengerType is INFT` |
| 2 | APIw | And | `Set Customer UpdatePassword Request old password as "<param>"` |
| 2 | APIw | And | `Verify Customer UpdatePassword Response has status as <n>` |
| 2 | APIm | And | `Customer VerifyTravelerDiscount Request travelerId set as null` |
| 2 | APIm | And | `ForgotPasswordEmail Request email set as "<param>"` |
| 2 | APIm | Then | `Verify ForgotPasswordEmail Response has status as <n>` |
| 2 | APIm | And | `Customer VerifyTravelerDiscount Request discountType set as null` |
| 2 | APIw | Then | `Verify Customer Activate Response has status as <n>` |
| 2 | APIw | Then | `Verify Customer GetTravelerList Response has status as <n>` |
| 2 | APIw | And | `Verify Customer GetTravelerList Response has passengers:` |
| 2 | APIw | And | `Verify Customer DeleteTraveler Response has messages:` |
| 2 | APIm | And | `Verify Customer UpdateEmailContact Response has messages:` |
| 2 | APIm | And | `Save created TDFA user as Customer existing user` |
| 2 | APIm | And | `Verify Customer VerifyDiscount Response has messages:` |
| 2 | APIm | And | `Mock Customer SetEmailConsent Request` |
| 2 | APIm | When | `I send Customer SetEmailConsent Request` |
| 2 | APIm | Then | `Verify Customer SetEmailConsent Response has status as <n>` |
| 2 | APIm | And | `Verify Customer SetEmailConsent Response has isSuccess as true` |
| 2 | APIm | And | `Mock Customer SetSmsConsent Request` |
| 2 | APIm | When | `I send Customer SetSmsConsent Request` |
| 2 | APIm | Then | `Verify Customer SetSmsConsent Response has status as <n>` |
| 2 | APIm | And | `Verify Customer SetSmsConsent Response has isSuccess as true` |
| 2 | APIw | Given | `Mock GetPassengerTypesForRoute Request` |
| 2 | APIw | * | `GetPassengerTypesForRoute Request departurePort is "<param>"` |
| 2 | APIw | * | `GetPassengerTypesForRoute Request arrivalPort is "<param>"` |
| 2 | APIw | When | `I send GetPassengerTypesForRoute Request` |
| 2 | APIw | Then | `Verify GetPassengerTypesForRoute Response status is <n>` |
| 2 | APIw | And | `Verify GetPassengerTypesForRoute Response has passenger types:` |
| 2 | APIw | And | `Verify GetWheelChair Response <n>. Flight departureInformation code is "<param>"` |
| 2 | APIw | And | `Verify GetWheelChair Response <n>. Flight arrivalInformation code is "<param>"` |
| 2 | APIw | And | `Verify GetWheelChair Response <n>. Flight and <n>. Passenger for passengerType is "<param>"` |
| 1 | APIw | And | `Verify GetSeatMap Response all seats for a passenger has Infant` |
| 1 | APIw | Then | `Verify RemoveBaggage Response` |
| 1 | APIw | And | `Verify ModifyMeal Response has selected as false` |
| 1 | APIw | And | `Mock Check-in GetSecondaryGroups Request For <n>. passenger with PassportNumber "<param>"` |
| 1 | APIw | When | `I send Check-in GetSecondaryGroups Request` |
| 1 | APIw | Then | `Verify Check-in GetSecondaryGroups Response has status as <n>` |
| 1 | APIw | And | `Verify Check-in GetSecondaryGroups Response has groups:` |
| 1 | APIw | And | `Verify GetAvailabilityForReissue Response has journeyType as INBOUND` |
| 1 | APIm | And | `Verify Customer VerifyDiscount Response has isSuccess as false` |
| 1 | APIw | * | `ModifyMeal Request segmentId is null` |
| 1 | APIw | * | `AssignSeat Request passengerId is null` |
| 1 | APIm | And | `Verify MyTrips GetFlightEvaluation Response has title as "<param>"` |
| 1 | APIm | And | `Verify MyTrips GetFlightEvaluation Response has description as "<param>"` |
| 1 | APIm | And | `Verify MyTrips GetFlightEvaluation Response has questions list with size <n>` |
| 1 | APIm | And | `Verify MyTrips GetFlightEvaluation Response has questions compared by consul surveyQuestion` |
| 1 | APIw | And | `Customer ForgotPasswordEmail Request email set by Enroll Request` |
| 1 | APIw | And | `Mock Customer ConfirmForgotPassword Request` |
| 1 | APIw | When | `I send Customer ConfirmForgotPassword Request` |
| 1 | APIw | Then | `Verify Customer ConfirmForgotPassword Response has status as <n>` |
| 1 | APIw | And | `Verify Customer ConfirmForgotPassword Response has isSuccess as true` |
| 1 | APIm | And | `Verify Customer VerifyTravelerDiscount Response has isSuccess as true` |
| 1 | APIm | And | `Customer VerifyTravelerDiscount Request travelerId set as <n>` |
| 1 | APIm | When | `I send Check-in GetDocumentSubType Request` |
| 1 | APIm | Then | `Verify Check-in GetDocumentSubType Response has status as <n>` |
| 1 | APIm | And | `Verify Check-in GetDocumentSubType Response content:` |
| 1 | APIm | And | `Verify Check-in SaveApisForm Response has messageResponses:` |
| 1 | APIm | And | `Wait <n> seconds for Api Test` |
| 1 | APIm | And | `Meal PnrLogin Request bookingId-surname set as <n>. DISB passenger ticketNumber-surname from context parameters` |
| 1 | APIm | And | `Verify Meal PnrLogin Response content:` |
| 1 | APIm | Given | `Mock OldFeedback Request` |
| 1 | APIm | When | `I send OldFeedback Request` |
| 1 | APIm | Then | `Verify OldFeedback Response has status as <n>` |
| 1 | APIm | And | `Verify OldFeedback Response has webRequestSeq is not null` |
| 1 | APIm | Given | `Mock SearchFeedback Request` |
| 1 | APIm | When | `I send SearchFeedback Request` |
| 1 | APIm | Then | `Verify SearchFeedback Response has status as <n>` |
| 1 | APIm | And | `Verify SearchFeedback Response has queueItemSearchDetailList is not null` |
| 1 | APIm | And | `Mock SeatMap PnrLogin Request with created PNR info` |
| 1 | APIm | And | `Verify GetSeatMap Response has description as "<param>"` |
| 1 | APIm | And | `Verify GetSeatMap Response has hasSelectableSeat as false` |
| 1 | APIm | And | `Verify GetSeatMap Response has code as "<param>"` |
| 1 | APIm | And | `SeatMap PnrLogin Request bookingId-surname set as <n>. DISB passenger ticketNumber-surname from context parameters` |
| 1 | APIm | And | `Verify SeatMap PnrLogin Response content:` |
| 1 | APIm | And | `SportEquipment PnrLogin Request bookingId-surname set as <n>. DISB passenger ticketNumber-surname from context parameters` |
| 1 | APIm | And | `Verify SportEquipment PnrLogin Response content:` |
| 1 | APIm | * | `Check-in SendBoardingPass Request segments set as:` |
| 1 | APIm | And | `Verify MyTrips GetReservationList Response has pastReservations list` |
| 1 | APIm | And | `Verify MyTrips GetReservationList Response pastReservations has isElligibleForCheckIn is false` |
| 1 | APIm | And | `Verify MyTrips GetReservationList Response futureReservations has isElligibleForCheckIn is true` |
| 1 | APIm | And | `Verify MyTrips GetReservationList Response pastReservations has same surname with consul user "<param>"` |
| 1 | APIm | And | `Verify MyTrips GetReservationList Response futureReservations has same surname with consul user "<param>"` |
| 1 | APIm | * | `Check-in GetBoardingPass Request segments set as:` |
| 1 | APIw | * | `AssignSeat Request seatNumber is null` |
| 1 | APIw | Then | `Verify RemoveSeat Response` |
| 1 | APIw | And | `Verify PaymentSummary Response <n>. passenger has passengerType as SLDD` |
| 1 | APIw | And | `Verify PaymentSummary Response <n>. passenger has passengerType as CHLD` |
| 1 | APIw | Then | `Verify CompletePayment Response` |
| 1 | APIw | Then | `Verify InitializePayment Response` |
| 1 | APIw | * | `GetSeatMap Request passengerId updated with <n>. Passenger Id` |
| 1 | APIw | When | `I send RemoveAllSeat Request` |
| 1 | APIw | Then | `Verify RemoveAllSeat Response` |
| 1 | APIm | And | `Check-in PnrLogin Request surname is "<param>"` |
| 1 | APIw | And | `Verify MyTrips MyFlightsInfo Response has isConnected is false` |
| 1 | APIw | And | `I set MyTrips PnrLogin Request bookingId as "<param>"` |
| 1 | APIw | Then | `Verify MyTrips SendActivationCode Response has status as <n>` |
| 1 | APIw | And | `Verify MyTrips SendActivationCode Response has isSuccess as true` |
| 1 | APIw | Then | `Verify MyTrips CheckActivationCode Response has status as <n>` |
| 1 | APIw | And | `Verify MyTrips CheckActivationCode Response has isSuccess as true` |
| 1 | APIw | And | `Verify MyTrips SetFlightsForReissue Response has returnDate as null` |
| 1 | APIw | And | `Mock MyTrips CheckActivationCode Request with Invalid Activation Code` |
| 1 | APIw | And | `I set surname and name for MyTrips UpsertMailSmsConsent Request` |
| 1 | APIw | And | `Mock MyTrips UpdateContact Request` |
| 1 | APIw | When | `I send MyTrips UpdateContact Request` |
| 1 | APIw | Then | `Verify MyTrips UpdateContact Response has status as <n>` |
| 1 | APIw | And | `Verify MyTrips UpdateContact Response has isSuccess as true` |
| 1 | APIw | When | `I send MyTrips PersistReissue Request` |
| 1 | APIw | Then | `Verify MyTrips PersistReissue Response has status as <n>` |
| 1 | APIw | And | `Verify MyTrips PersistReissue Response has isSuccess as true` |
| 1 | APIw | And | `Verify MyTrips PersistReissue Response has needPayment is true` |
| 1 | APIw | Then | `Verify SetCurrency Response has status as <n>` |
| 1 | APIw | And | `Verify SetCurrency Response has isSuccess as true` |
| 1 | APIw | * | `ModifyPassengers passengerInfo updated with information of consul user "<param>"` |
| 1 | APIw | * | `MyTrips UpdateMemberShipId update membershipId with M&S no of consul user "<param>"` |
| 1 | APIw | And | `I set MyTrips UpdateMemberShipId membershipId as "<param>"` |
| 1 | APIw | Then | `Verify MyTrips UpdateMemberShipId Response has status as <n>` |
| 1 | APIw | And | `Verify MyTrips UpdateMemberShipId Response has isSuccess as true` |
| 1 | APIw | And | `Verify MyTrips UpdateMemberShipId Response has content message is "<param>"` |
| 1 | APIw | * | `RemoveSeat Request segmentId is null` |
| 1 | APIw | And | `Mock Customer Refresh Request` |
| 1 | APIw | When | `I send Customer Refresh Request` |
| 1 | APIw | Then | `Verify Customer Refresh Response has status as <n>` |
| 1 | APIw | And | `Verify Customer Refresh Response has accessToken is not null` |
| 1 | APIw | And | `Verify Customer Refresh Response has refreshToken is not null` |
| 1 | APIw | And | `Verify Customer Refresh Response has expiresIn is <n>` |
| 1 | APIm | And | `Verify Customer Login Response has refreshToken is not null` |
| 1 | APIm | And | `Verify Customer Login Response has expiresIn is <n>` |
| 1 | APIw | * | `RemoveSeat Request passengerId is null` |
| 1 | APIw | * | `AssignSeat Request segmentId is null` |
| 1 | APIm | * | `SportEquipment PnrLogin Request updated by context parameters` |
| 1 | APIm | And | `Verify SportEquipment PnrLogin Response has currencyCode as "<param>"` |
| 1 | APIm | And | `Verify SportEquipment PnrLogin Response has isSuccess as true` |
| 1 | APIm | And | `Verify SeatMap PnrLogin Response has currencyCode as "<param>"` |
| 1 | APIm | And | `Verify SeatMap PnrLogin Response has isSuccess as true` |
| 1 | APIm | And | `Verify Baggage PnrLogin Response has currencyCode as "<param>"` |
| 1 | APIm | And | `Verify Baggage PnrLogin Response has isSuccess as true` |
| 1 | APIw | And | `Baggage PnrLogin Request bookingId-surname set as <n>. DISB passenger ticketNumber-surname from context parameters` |
| 1 | APIw | And | `Verify Baggage PnrLogin Response content:` |
| 1 | APIw | When | `Mock PassengerCheck Request by consul for DISB passenger` |
| 1 | APIw | And | `Check-in GetPassengers Request segmentIds has set as null` |
| 1 | APIw | Then | `Verify Check-in GetPassengers Response has messages:` |
| 1 | APIm | When | `Mock PassengerCheck Request for SLDD passenger` |
| 1 | APIm | And | `Verify Check-in GetFlights Response segmentIdsForCheckIn list has segmentIds:` |
| 1 | APIm | When | `Mock PassengerCheck Request by consul for SLDD passenger` |
| 1 | APIm | Then | `Verify MyTrips MyFlightsInfo Response has isActivatedByOtp is false` |
| 1 | APIm | And | `Verify SetPromotion Response has isSuccess as true` |
| 1 | APIm | And | `Verify GetBookingDetails Response has prices:` |
| 1 | APIm | And | `Verify PaymentSummary Response has prices:` |
| 1 | APIm | And | `Baggage PnrLogin Request bookingId set as <n>. DISB passenger ticketNumber from context parameters` |
| 1 | APIm | And | `Baggage PnrLogin Request surname set as <n>. ADLT passenger surname from context parameters` |
| 1 | APIm | And | `Verify Baggage PnrLogin Response has messageResponses:` |
| 1 | APIm | Then | `Verify MyTrips MyFlightsInfo Response has isActivatedByOtp is true` |
| 1 | APIm | And | `Meal PnrLogin Request bookingId set as <n>. DISB passenger ticketNumber from context parameters` |
| 1 | APIm | And | `Meal PnrLogin Request surname set as <n>. ADLT passenger surname from context parameters` |
| 1 | APIm | And | `Verify Meal PnrLogin Response has messageResponses:` |
| 1 | APIm | And | `SportEquipment PnrLogin Request bookingId set as <n>. DISB passenger ticketNumber from context parameters` |
| 1 | APIm | And | `SportEquipment PnrLogin Request surname set as <n>. ADLT passenger surname from context parameters` |
| 1 | APIm | And | `Verify SportEquipment PnrLogin Response has messageResponses:` |
| 1 | APIm | And | `SeatMap PnrLogin Request bookingId set as <n>. DISB passenger ticketNumber from context parameters` |
| 1 | APIm | And | `SeatMap PnrLogin Request surname set as <n>. ADLT passenger surname from context parameters` |
| 1 | APIm | And | `Verify SeatMap PnrLogin Response has messageResponses:` |
| 1 | APIm | And | `Verify GetBaggage Response has hasTransfer is true` |
| 1 | APIm | And | `Verify GetBaggage Response has segmentIds` |
| 1 | APIw | And | `Verify PaymentSummary Response has not title as "<param>" in Prices` |
| 1 | APIm | * | `Check-in SendBoardingPass Request segments set as null` |
| 1 | APIm | * | `Check-in GetBoardingPass Request segmentIds has set as null` |
| 1 | APIm | And | `Verify Check-in GetBoardingPass Response has messageResponses:` |
| 1 | APIm | And | `Check-in TicketLogin Request ticket numbers set by context parameters` |
| 1 | APIm | Then | `Verify GetBaggage Response has "<param>" quantity for <n>. flight` |
| 1 | APIm | And | `Verify GetBaggage Response has "<param>" with measure for <n>. flight` |
| 1 | APIm | And | `Mock ModifyBaggage Request for <n>. Flight <n>. Passenger with quantity <n>` |
| 1 | APIm | And | `Mock AddCabinBaggage Request for <n>. Flight <n>. Passenger` |
| 1 | APIm | When | `I send RemoveAllCabinBaggage Request` |
| 1 | APIm | Then | `Verify RemoveAllCabinBaggage Response` |
| 1 | APIm | And | `I remove Cabin Baggage for flight passengers:` |
| 1 | APIm | Then | `Verify MyTrips MyFlightsInfo Response has allowedActions:` |
| 1 | Web | Then | `Verify that MEMBERSHIP_DELETED_SUCCESSFULLY toast message is displayed` |
| 1 | Web | * | `User attributes are the same as the created PNR passenger` |
| 1 | Web | * | `Seat:` |
| 1 | Web | * | `CIP:` |
| 1 | Web | Then | `Verify that new user is created` |
| 1 | Web | Then | `Verify that <param> Page URL is valid` |
| 1 | Web | And | `Verify that <param> Page title is displayed` |
| 1 | APIw | When | `I send AssertBundleSeats Request` |
| 1 | APIw | Then | `Verify AssertBundleSeats Response has status as <n>` |
| 1 | APIw | And | `Verify AssertBundleSeats Response has isPassed as false` |
| 1 | APIw | And | `Verify AssertBundleSeats Response has description as "<param>"` |
| 1 | APIw | And | `Verify Check-in GetBoardingPass Response passenger fields by context parameters for passengers:` |
| 1 | APIm | And | `Verify StatusByFlightNumber Response content for given parameters by values:` |
| 1 | APIm | And | `Verify StatusByFlightNumber Response content for given parameters is not null:` |
| 1 | APIw | * | `AssignSeat Request seatNumber is updated by a seat from NON_STANDARD seatGroup` |
| 1 | APIw | And | `Verify AssignSeat Response selectedSeats price amount is positive number for requestedSeat` |
| 1 | APIw | * | `RemoveSeat Request passengerId updated with <n>. Passenger Id` |
| 1 | APIw | * | `RemoveSeat Request segmentId updated with <n>. Flight <n>. Segment Id` |
| 1 | APIw | And | `Verify MyTrips PnrLogin Response has conversationId is not null` |
| 1 | APIw | And | `Verify MyTrips PnrLogin Response has isSuccess as true` |
| 1 | APIw | And | `Verify MyTrips PnrLogin Response has isIrr is false` |
| 1 | APIw | And | `Verify MyTrips PnrLogin Response has isInvoluntaryActionsNotAllowed is false` |
| 1 | APIw | And | `Verify MyTrips PnrLogin Response has isRhs is false` |
| 1 | APIw | And | `Verify MyTrips MyFlightsInfo Response has isConnected is true` |
| 1 | APIm | * | `Meal PnrLogin Request updated by context parameters` |
| 1 | APIm | And | `Verify Meal PnrLogin Response has currencyCode as "<param>"` |
| 1 | APIm | And | `Verify Meal PnrLogin Response has isSuccess as true` |
| 1 | APIm | When | `Mock PassengerCheck Request for DISB passenger` |
| 1 | APIm | And | `SeatMap PnrLogin Request surname set as "<param>"` |
| 1 | APIw | And | `Verify PaymentSummary Response <n>. passenger has passengerType as TEAC` |
| 1 | APIw | And | `Verify PaymentSummary Response <n>. passenger has passengerType as STDT` |
| 1 | APIw | And | `Verify GetBookingDetails Response has <n> passenger with typeCode as DISB` |
| 1 | APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight and <n>. passenger hasInfant is true` |
| 1 | APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight and <n>. passenger passengerType is INFT` |
| 1 | APIm | Given | `Mock GetNecessaryDocuments Request` |
| 1 | APIm | When | `I send GetNecessaryDocuments Request` |
| 1 | APIm | Then | `Verify GetNecessaryDocuments Response has status as <n>` |
| 1 | APIm | And | `Verify GetNecessaryDocuments Response has caseAttachmentList is not null` |
| 1 | APIw | And | `Verify PaymentSummary Response <n>. passenger has passengerType as DISB` |
| 1 | APIw | And | `I set MyTrips PnrLogin Request surname as "<param>"` |
| 1 | APIw | * | `I set second segment for AddCipLounge Request` |
| 1 | Web | Then | `Verify that logged user is remembered` |
| 1 | Web | Then | `Verify that clicked link navigated to the <param> Page` |
| 1 | Web | Then | `Verify that Incomplete Passenger Info dialog is displayed` |
| 1 | Web | Then | `Verify that each <param> link is navigated` |
| 1 | APIm | And | `Verify GetCipLounge Response has segmentIds` |
| 1 | APIw | And | `Verify GetBookingDetails Response has <n> passenger with typeCode as SLDD` |
| 1 | APIw | And | `I send RemoveAllSportEquipment Request` |
| 1 | APIw | Then | `Verify RemoveAllSportEquipment Response has status as <n>` |
| 1 | APIw | And | `Verify RemoveAllSportEquipment Response has isSuccess as true` |
| 1 | APIw | And | `Verify AddSportEquipment Response has isSuccess as true` |
| 1 | APIw | And | `Verify RemoveSportEquipment Response has isSuccess as true` |
| 1 | APIw | * | `AddSportEquipment Request passengerId is null` |
| 1 | APIw | * | `AddSportEquipment Request segmentIds is null` |
| 1 | APIw | * | `RemoveSportEquipment Request passengerId is null` |
| 1 | APIw | * | `RemoveSportEquipment Request segmentIds is null` |
| 1 | APIm | Then | `Verify AddCabinBaggage Response has messageResponses:` |
| 1 | APIm | And | `I set RemovePromotion promotionCode as "<param>"` |
| 1 | APIm | And | `Verify RemovePromotion Response has messages:` |
| 1 | APIm | And | `Verify RemovePromotion Response has isSuccess as true` |
| 1 | APIw | * | `ModifyPassengers <n>. passenger lastName is null` |
| 1 | APIw | And | `Mock CheckMs Request by consul with user "<param>"` |
| 1 | APIw | And | `Verify CheckMs Response has isSuccess as true` |
| 1 | And | Given | `Ajet Android cookies added successfully` |
| 1 | And | When | `Verify Ajet Android Availability page opened successfully` |
| 1 | APIw | And | `Set Customer UpdatePassword Request old password by signed in user` |
| 1 | APIm | And | `Verify Enroll Response has otpId is not null` |
| 1 | APIm | And | `Customer VerifyTravelerDiscount Request discountType set as "<param>"` |
| 1 | APIm | And | `Verify Customer VerifyTravelerDiscount Response has isSuccess as false` |
| 1 | APIw | And | `Verify GetPassengers Response has <n> passenger that passengerType is DISB` |
| 1 | APIw | And | `Verify GetPassengers Response for <n>. passenger passengerType is DISB` |
| 1 | APIw | And | `Verify GetPassengers Response has <n> passenger that passengerType is SLDD` |
| 1 | APIw | And | `Verify GetPassengers Response for <n>. passenger passengerType is SLDD` |
| 1 | APIw | * | `ModifyPassengers <n>. passenger gender is null` |
| 1 | APIw | * | `ModifyPassengers <n>. passenger firstName is null` |
| 1 | APIw | * | `ModifyPassengers Contact Info email is null` |
| 1 | APIw | And | `Verify GetFlightPassengerDetails Response for <n>. flight and <n>. passenger passengerType is DISB` |
| 1 | APIw | And | `Verify GetSeatMap Response has type as "<param>"` |
| 1 | APIw | And | `Verify GetSeatMap Response has code as <n>` |
| 1 | APIw | And | `Verify GetSeatMap Response has message as "<param>"` |
| 1 | APIw | And | `Verify GetAvailableSsr Response has passSelection is not null` |
| 1 | APIw | And | `Verify ModifyMeal Response has selected as true` |
| 1 | APIw | * | `ModifyMeal Request <n>. passenger passengerId is null` |
| 1 | APIw | * | `RemoveBaggage Request passengerId is null` |
| 1 | APIw | * | `ModifyBaggage Request segmentId is null` |
| 1 | APIw | * | `RemoveBaggage Request segmentId is null` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger without Membership Id` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger with invalid MS Number` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger without Gender` |
| 1 | APIw | And | `Verify CheckMs Response has message as "<param>"` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger without Last Name` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger without First Name` |
| 1 | APIw | When | `I add WheelChair for flight passengers:` |
| 1 | APIw | Then | `Verify AddWheelChair Response has status as <n>` |
| 1 | APIw | And | `Verify GetWheelChair Response <n>. Flight hasWheelChair is "<param>"` |
| 1 | APIw | When | `I send GetCountryList Request` |
| 1 | APIw | Then | `Verify GetCountryList Response` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger with Last Name is empty` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger with First Name is empty` |
| 1 | APIm | When | `Mock PassengerCheck Request by consul for STDT passenger` |
| 1 | Web | When | `I click the NEXT button until last image on Homepage Slider` |
| 1 | Web | And | `Verify that NEXT button on Homepage Slider is inactive` |
| 1 | Web | And | `I click the PREV button until first image on Homepage Slider` |
| 1 | Web | And | `Verify that PREV button on Homepage Slider is inactive` |
| 1 | APIm | When | `Mock PassengerCheck Request by consul for TEAC passenger` |
| 1 | APIw | And | `Verify GetPassengers Response has <n> passenger that passengerType is TEAC` |
| 1 | APIw | And | `Verify GetPassengers Response has <n> passenger that passengerType is STDT` |
| 1 | APIw | And | `Verify GetPassengers Response for <n>. passenger passengerType is TEAC` |
| 1 | APIw | And | `Verify GetPassengers Response for <n>. passenger passengerType is STDT` |
| 1 | APIm | When | `Mock PassengerCheck Request for TEAC passenger` |
| 1 | APIw | And | `Verify GetBookingDetails Response has <n> passenger with typeCode as TEAC` |
| 1 | APIw | And | `Verify GetBookingDetails Response has <n> passenger with typeCode as STDT` |
| 1 | APIm | And | `Mock MyTrips SaveFlightEvaluation Request` |
| 1 | APIm | When | `I send MyTrips SaveFlightEvaluation Request` |
| 1 | APIm | Then | `Verify MyTrips SaveFlightEvaluation Response has status as <n>` |
| 1 | APIm | And | `Verify MyTrips SaveFlightEvaluation Response has isSuccess as true` |
| 1 | APIm | And | `I set MyTrips GetFlightEvaluation Request segmentId with evaluated segmentId` |
| 1 | APIm | And | `Verify MyTrips GetFlightEvaluation Response has messageResponses:` |
| 1 | APIw | When | `I send GetCurrencyList Request` |
| 1 | APIw | Then | `Verify GetCurrencyList Response` |
| 1 | APIw | And | `Verify GetBookingDetails Response has <n> passenger with typeCode as CHLD` |
| 1 | APIm | * | `SeatMap PnrLogin Request surname is null` |
| 1 | APIm | * | `SeatMap PnrLogin Request bookingId is null` |
| 1 | APIm | * | `SeatMap PnrLogin Request bookingId is "<param>"` |
| 1 | APIw | Then | `Verify RemoveCipLounge Response` |
| 1 | APIm | * | `Cip PnrLogin Request updated by context parameters` |
| 1 | APIm | And | `Verify Cip PnrLogin Response has currencyCode as "<param>"` |
| 1 | APIm | And | `Verify Cip PnrLogin Response has isSuccess as true` |
| 1 | APIm | And | `Cip PnrLogin Request bookingId-surname set as <n>. DISB passenger ticketNumber-surname from context parameters` |
| 1 | APIm | And | `Verify Cip PnrLogin Response content:` |
| 1 | APIm | And | `Cip PnrLogin Request bookingId set as <n>. DISB passenger ticketNumber from context parameters` |
| 1 | APIm | And | `Cip PnrLogin Request surname set as <n>. ADLT passenger surname from context parameters` |
| 1 | APIm | And | `Verify Cip PnrLogin Response has messageResponses:` |
| 1 | APIw | And | `Verify GetSeatMap Response content airCraftType is null` |
| 1 | APIw | And | `Verify GetSeatMap Response content wing is null` |
| 1 | APIw | And | `Verify GetSeatMap Response content availability hasSelectableSeat is false` |
| 1 | APIw | And | `Verify GetSeatMap Response content availability code is "<param>"` |
| 1 | APIw | And | `Verify GetSeatMap Response content availability description is "<param>"` |
| 1 | APIw | * | `RemoveCipLounge Request passengerId is null` |
| 1 | APIw | * | `RemoveCipLounge Request segmentId is null` |
| 1 | APIw | * | `AddCipLounge Request segmentId is null` |
| 1 | APIm | And | `Verify GetCipLounge Response has <n> passengers` |
| 1 | APIw | * | `AddCipLounge Request passengerId is null` |
| 1 | APIw | * | `ModifyBaggage Request passengerId is null` |
| 1 | APIm | And | `Verify StatusByFlightNumber Response content is null` |
| 1 | APIm | When | `I send CancelOptionBooking Request` |
| 1 | APIm | Then | `Verify CancelOptionBooking Response has status as <n>` |
| 1 | APIm | And | `Verify CancelOptionBooking Response content has isSuccess as true` |
| 1 | APIm | And | `Verify StatusByPort Response all Flight list for given parameters by values:` |
| 1 | APIm | And | `Verify StatusByPort Response all Flight list for given parameters is not null:` |
| 1 | APIm | And | `Verify StatusByRoute Response all Flight list for given parameters by values:` |
| 1 | APIm | And | `Verify StatusByRoute Response all Flight list for given parameters is not null:` |
| 1 | APIw | When | `I send GetTimeRangeList Request` |
| 1 | APIw | Then | `Verify GetTimeRangeList Response status is <n>` |
| 1 | APIw | And | `Verify GetTimeRangeList Response content list:` |
| 1 | APIw | And | `Verify Availability Response content is null` |
| 1 | APIw | And | `Verify StatusByRoute Response has messages:` |
| 1 | APIw | And | `CreateBooking referenceId is null` |
| 1 | APIw | Then | `Verify CreateBooking Response has status as <n>` |
| 1 | APIw | And | `Verify CreateBooking Response has messages:` |
| 1 | APIm | And | `Check-in PnrLogin Request bookingId is "<param>"` |
| 1 | APIm | When | `I send Check-in GetDocumentEntryType Request` |
| 1 | APIm | Then | `Verify Check-in GetDocumentEntryType Response has status as <n>` |
| 1 | APIm | And | `Verify Check-in GetDocumentEntryType Response content:` |
| 1 | APIm | When | `Check-in TicketLogin Request credentials:` |
| 1 | APIw | And | `Mock CheckMs Request with ADLT Passenger without Birth Date` |
| 1 | APIm | When | `Mock PassengerCheck Request for STDT passenger` |
| 1 | APIw | * | `ModifyPassengers <n>. passenger nationaltyType is null` |
| 1 | APIw | And | `Verify GetPassengers Response has <n> passenger that passengerType is CHLD` |
| 1 | APIw | And | `Verify GetPassengers Response for <n>. passenger passengerType is CHLD` |
| 1 | APIm | And | `Wait <n> minutes for Api Test` |
| 1 | APIw | * | `Customer UpdateTraveler Request updated for <n>. saved traveler by:` |
| 1 | APIw | And | `Verify Customer UpdateTraveler Response content:` |
| 1 | APIw | And | `Set Customer UpdatePhoneContact Request phoneInfo as random valid phone number` |
| 1 | APIw | And | `Verify Customer UpdatePhoneContact Response has otpId is not null` |
| 1 | APIm | And | `Verify ForgotPasswordEmail Response has otpId is not null` |
| 1 | APIw | And | `I set email as random email address in Customer UpdateEmailContact Request` |
| 1 | APIw | And | `Verify Customer UpdateEmailContact Response has otpId is not null` |
| 1 | APIm | And | `Verify ForgotPasswordEmail Response has messages:` |
| 1 | APIm | And | `Customer Auth ResendOtp Request otpId set as nul` |
| 1 | APIm | And | `Login Request password set as "<param>"` |
| 1 | APIm | And | `Verify Customer Login Response has messages:` |
| 1 | APIm | * | `Enroll Request email set by consul userTitle "<param>"` |
| 1 | APIw | And | `Verify Customer Activate Response has messages:` |
| 1 | APIm | * | `Enroll Request phoneNumber set by consul userTitle "<param>"` |
| 1 | APIw | * | `Customer DeleteTraveler Request travelerId set for passenger:` |
| 1 | APIw | And | `Verify Customer GetTravelerList Response not has passengers:` |
| 1 | APIw | * | `Customer UpdateTraveler Request travelerId set as null` |
| 1 | APIw | When | `I send Customer Delete Request` |
| 1 | APIw | Then | `Verify Customer Delete Request has status as <n>` |
| 1 | APIm | And | `Mock Customer UpsertDeviceToken Request` |
| 1 | APIm | When | `I send Customer UpsertDeviceToken Request` |
| 1 | APIm | Then | `Verify Customer UpsertDeviceToken Response has status as <n>` |
| 1 | APIm | And | `Verify Customer UpsertDeviceToken Response has isSuccess as true` |
| 1 | APIm | And | `Set Customer UpdateEmailContact Request email as "<param>"` |
| 1 | APIm | And | `Set Customer UpdatePhoneContact Request countryCode as invalid for Turkish phone number` |
| 1 | APIm | And | `Verify Customer UpdatePhoneContact Response has messages:` |
| 1 | APIm | And | `Set Customer UpdateEmailContact Request email by another existing user` |
| 1 | APIm | And | `Set Customer UpdatePhoneContact Request phoneInfo by another existing user` |
| 1 | APIw | And | `Mock Customer Login Request with credentials of created membership` |
| 1 | APIw | And | `Mock Customer UpdatePassword Request` |
| 1 | APIw | And | `Set Customer UpdatePassword Request oldPassword with password of created membership` |
| 1 | APIw | And | `Set Customer UpdatePassword Request newPassword as "<param>"` |
| 1 | APIw | When | `I send Customer UpdatePassword Request` |
| 1 | APIw | Then | `Verify Customer UpdatedPassword Response has status as <n>` |
| 1 | APIw | And | `Verify Customer UpdatePassword Response has isSuccess as true` |
| 1 | APIm | And | `Customer UpdateEmailContact Request email set as null` |
| 1 | APIm | And | `Mock Customer UpsertDeviceTokenWithPnr Request` |
| 1 | APIm | When | `I send Customer UpsertDeviceTokenWithPnr Request` |
| 1 | APIm | Then | `Verify Customer UpsertDeviceTokenWithPnr Response has status as <n>` |
| 1 | APIm | And | `Verify Customer UpsertDeviceTokenWithPnr Response has isSuccess as true` |
| 1 | APIm | When | `I send Customer GetConsent Request` |
| 1 | APIm | Then | `Verify Customer GetConsent Response has status as <n>` |
| 1 | APIm | And | `Verify Customer GetConsent Response has emailConsent is not null` |
| 1 | APIm | And | `Verify Customer GetConsent Response has smsConsent is not null` |
| 1 | APIm | And | `Verify Customer VerifyDiscount Response has isSuccess as true` |
| 1 | APIm | And | `Set Customer VerifyDiscount discountType as null` |
| 1 | APIw | And | `Verify Customer Activate Response has isSuccess as true` |
| 1 | APIw | Then | `Verify Customer Retrieve Response has status as <n>` |
| 1 | APIw | And | `Verify Customer Retrieve Response has customerId is not null` |
| 1 | APIw | And | `Verify Customer Retrieve Response has information same with consul user "<param>"` |
| 1 | APIw | And | `Verify Customer Retrieve Response has discountTypes:` |
| 1 | APIm | Given | `Mock Customer Logout Request with null refreshToken` |
| 1 | APIm | And | `Verify Customer Logout Response has messages:` |
| 1 | APIm | And | `SetEmailConsent Request consent set as true` |
| 1 | APIm | And | `SetSmsConsent Request consent set as false` |
| 1 | APIm | And | `SetSmsConsent Request consent set as true` |
| 1 | APIm | And | `SetEmailConsent Request consent set as false` |
| 1 | APIw | * | `Customer UpdateTraveler Request travelerId set as <n>` |
| 1 | APIw | * | `Customer UpdateTraveler Request formType set as "<param>"` |
| 1 | APIw | * | `Customer DeleteTraveler Request travelerId set as <n>` |
| 1 | APIw | * | `Customer UpdateTraveler Request formType set as null` |
| 1 | APIw | Then | `Verify Customer AddTraveler Response has status as <n>` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has travelerId is not null` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has firstName is "<param>"` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has lastName is "<param>"` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has gender is "<param>"` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has dateOfBirth is "<param>"` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has nationality is "<param>"` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has nationalId is "<param>"` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has email as null` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has countryCode as null` |
| 1 | APIw | And | `Verify Customer AddTraveler Response has phoneNumber as null` |
| 1 | APIm | And | `Mock Check-in SetNationality Request` |
| 1 | APIm | * | `Check-in SetNationality Request nationalities set as:` |
| 1 | APIm | And | `I send Check-in SetNationality Request` |
| 1 | APIm | And | `Baggage PnrLogin Request ticketNumber-surname set from Payment Response for <n>. segment <n>. passenger` |
| 1 | APIw | * | `GetSelectedMeal Request segmentId is null` |
| 1 | APIw | Then | `Verify GetSelectedMeal Request has statusCode as <n>` |
| 1 | APIw | And | `Verify GetSelectedMeal Request message type as "<param>"` |
| 1 | APIw | And | `Verify GetSelectedMeal Request message code as <n>` |
| 1 | APIw | And | `Verify GetSelectedMeal Request message as "<param>"` |
| 1 | APIm | And | `Mock AcceptPaymentDocument Request` |
| 1 | APIm | When | `I send AcceptPaymentDocument Request` |
| 1 | APIm | Then | `Verify AcceptPaymentDocument Response has status as <n>` |
| 1 | APIm | And | `Verify AcceptPaymentDocument Response has isSuccess as true` |
| 1 | APIm | And | `Mock GetCaseDetailsWithUser Request` |
| 1 | APIm | When | `I send GetCaseDetailsWithUser Request` |
| 1 | APIm | Then | `Verify GetCaseDetailsWithUser Response has status as <n>` |
| 1 | APIm | And | `Verify GetCaseDetailsWithUser Response has caseInfo is not null` |
| 1 | APIm | Given | `Mock GetAdditionalInfo Request` |
| 1 | APIm | When | `I send GetAdditionalInfo Request` |
| 1 | APIm | Then | `Verify GetAdditionalInfo Response has status as <n>` |
| 1 | APIm | And | `Verify GetAdditionalInfo Response has additionalInfo is not null` |
| 1 | APIm | And | `Mock AddMessage Request` |
| 1 | APIm | When | `I send AddMessage Request` |
| 1 | APIm | Then | `Verify AddMessage Response has status as <n>` |
| 1 | APIm | And | `Verify AddMessage Response has isSuccess as true` |
| 1 | APIm | Given | `Mock GetBaggageQuestioning Request` |
| 1 | APIm | When | `I send GetBaggageQuestioning Request` |
| 1 | APIm | Then | `Verify GetBaggageQuestioning Response has status as <n>` |
| 1 | APIm | And | `Verify GetBaggageQuestioning Response has caseInfo is not null` |
| 1 | APIm | When | `I send GetCountryBankRules Request` |
| 1 | APIm | Then | `Verify GetCountryBankRules Response has status as <n>` |
| 1 | APIm | And | `Verify GetCountryBankRules Response content list is not empty` |
| 1 | APIm | When | `I send GetCategoryList Request` |
| 1 | APIm | Then | `Verify GetCategoryList Response has status as <n>` |
| 1 | APIm | And | `Verify GetCategoryList Response content list has categoryNames` |
| 1 | APIm | And | `Mock AttachFile Request` |
| 1 | APIm | When | `I send AttachFile Request` |
| 1 | APIm | Then | `Verify AttachFile Response has status as <n>` |
| 1 | APIm | And | `Verify AttachFile Response has isSuccess as true` |
| 1 | APIm | Then | `Verify CreateCase Response has status as <n>` |
| 1 | APIm | And | `Verify CreateCase Response has caseInfo is not null` |
| 1 | APIm | Given | `GetCategoryDetail Request categoryName is RESERVATION_AND_TICKETING` |
| 1 | APIm | Given | `GetCategoryDetail Request categoryName is DURING_FLIGHT` |
| 1 | APIm | Given | `GetCategoryDetail Request categoryName is AIRPORT` |
| 1 | APIm | Given | `GetCategoryDetail Request categoryName is FLIGHT_IRREGULARITIES` |
| 1 | APIm | Given | `Mock GetDigestedTCKNInquiry Request` |
| 1 | APIm | When | `I send GetDigestedTCKNInquiry Request` |
| 1 | APIm | Then | `Verify GetDigestedTCKNInquiry Response has status as <n>` |
| 1 | APIm | And | `Verify GetDigestedTCKNInquiry Response has tcStatus is not null` |
| 1 | APIm | Given | `GetCategoryDetail Request categoryName is OTHER` |
| 1 | APIm | And | `Mock UpdateContactInfo Request` |
| 1 | APIm | When | `I send UpdateContactInfo Request` |
| 1 | APIm | Then | `Verify UpdateContactInfo Response has status as <n>` |
| 1 | APIm | And | `Verify UpdateContactInfo Response has isSuccess as true` |
| 1 | APIw | Given | `Mock NearestAirPort Request` |
| 1 | APIw | * | `NearestAirPort Request parameters:` |
| 1 | APIw | When | `I send NearestAirPort Request` |
| 1 | APIw | Then | `Verify NearestAirPort Response has status as <n>` |
| 1 | APIw | And | `Verify NearestAirPort Response content has city is "<param>"` |
| 1 | APIw | And | `Verify NearestAirPort Response content has code is "<param>"` |
| 1 | APIw | And | `Verify NearestAirPort Response content has country is "<param>"` |
| 1 | APIw | And | `Verify NearestAirPort Response content has cityName is "<param>"` |
| 1 | APIw | And | `Verify NearestAirPort Response content has countryName is "<param>"` |
| 1 | APIw | And | `Verify NearestAirPort Response content has portName is "<param>"` |
| 1 | APIw | And | `Verify NearestAirPort Response content has lat is <n>` |
| 1 | APIw | And | `Verify NearestAirPort Response content has long is <n>` |
| 1 | APIw | Given | `Mock GetPortMatrix Request` |
| 1 | APIw | And | `GetPortMatrix portCode is "<param>"` |
| 1 | APIw | When | `I send GetPortMatrix Request` |
| 1 | APIw | Then | `Verify GetPortMatrix Response` |
| 1 | APIw | When | `I send GetPortList Request` |
| 1 | APIw | Then | `Verify GetPortList Response` |
| 1 | APIw | Given | `Mock GetAvailableFlightDates Request` |
| 1 | APIw | * | `GetAvailableFlightDates Request parameters:` |
| 1 | APIw | When | `I send GetAvailableFlightDates Request` |
| 1 | APIw | Then | `Verify GetAvailableFlightDates Response` |
| 1 | APIw | And | `Verify GetWheelChair Response <n>. Flight isEligibleForWheelChair is false` |
| 1 | APIw | And | `Verify GetWheelChair Response <n>. Flight isEligibleForWheelChair is true` |

## Home Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 142 | Web | When | `I book for the flight with the following details in Search Flight Tab View on Home Page` |
| 140 | Web | When | `I click the Search Flight button in Search Flight Tab View on Home Page` |
| 70 | Web | When | `I click the "<param>" link in the EXPLORE Header menu on Home Page` |
| 63 | Web | When | `I click the Login button in the Header on Home Page` |
| 58 | Web | Then | `Verify that login process was successful on Home Page` |
| 49 | Web/rIOS | When | `I click the MY_TRIPS tab item on Home Page` |
| 48 | Web/rIOS | And | `I search for flight with the valid PNR and surname in My Trips Tab View on Home Page` |
| 44 | Web | When | `I open the Member Menu in the Header on Home Page` |
| 40 | Web | And | `I click the Member Info link in the Member Menu on Home Page` |
| 31 | Web | When | `I sign in with created user on Home Page` |
| 23 | Web | When | `I click the ONLINE_CHECKIN tab item on Home Page` |
| 23 | Web | When | `I click the Search Trip button in Check In Tab View on Home Page` |
| 22 | Web | And | `I sign in with ADULT user type in the Login Form on Home Page` |
| 21 | Web | When | `I click the FEEDBACK_FORM link in the footer on Home Page` |
| 20 | Web | When | `I enter the the valid PNR and surname in Check In Tab View on Home Page` |
| 17 | Web | And | `I click the BAGGAGE_TRACKING link in the footer on Home Page` |
| 13 | Web | And | `I hover the "<param>" menu in the Header on Home Page` |
| 13 | Web | And | `I click the "<param>" link in the Header Sub Menu on Home Page` |
| 12 | Web | When | `I click the SEAT_SELECTION standalone service card on Home Page` |
| 10 | Web | When | `I click the EXCESS_BAGGAGE standalone service card on Home Page` |
| 8 | Web | When | `I click the CIP_LOUNGE standalone service card on Home Page` |
| 7 | Web | When | `I click the logo on Home Page` |
| 7 | Web | And | `I click the FLIGHT_STATUS tab item on Home Page` |
| 7 | Web | When | `I click the Search button in Flight Status Tab View on Home Page` |
| 7 | Web | And | `I click the STAY_INFORMED_ABOUT_US link in the footer on Home Page` |
| 6 | Web | When | `I click the MEAL_SELECTION standalone service card on Home Page` |
| 5 | Web | When | `I click the SPORT_EQUIPMENT standalone service card on Home Page` |
| 5 | Web | Then | `Verify that Home Page opened` |
| 5 | Web | And | `I search for the status by ROUTE with the following details in Flight Status Tab View on Home Page` |
| 4 | Web | And | `Verify that Change Cookie Settings dialog is displayed on Home Page` |
| 3 | Web | Then | `Verify that Homepage Slider is at "<param>" image on Home Page` |
| 3 | Web | And | `I click the CHANGE_COOKIE_SETTINGS link in the footer on Home Page` |
| 3 | Web | When | `I click the increase passenger button in Search Flight Tab View on Home Page` |
| 2 | Web | And | `I click the My Flights link in the Member Menu on Home Page` |
| 2 | Web | And | `Verify that Homepage Slider is not at "<param>" image on Home Page` |
| 2 | Web | And | `I click the Sign up button in the Login Form on Home Page` |
| 2 | Web | And | `I sign in with DISABLED_PASSENGER user type in the Login Form on Home Page` |
| 2 | Web | When | `I click the "<param>" language button in the header on Home Page` |
| 2 | Web | Then | `Verify that language is changed with "<param>" on Home Page` |
| 2 | Web | Then | `Verify that ANALYTICS_COOKIES setting is true in the Change Cookie Settings dialog on Home Page` |
| 2 | Web | And | `I click the Accept and Close button in the Change Cookie Settings dialog on Home Page` |
| 2 | Web | And | `Verify that Change Cookie Settings dialog is not visible on Home Page` |
| 2 | Web | Then | `Verify that ANALYTICS_COOKIES setting is false in the Change Cookie Settings dialog on Home Page` |
| 2 | Web | Then | `Verify that MAXIMUM_NUMBER_OF_PASSENGERS message is displayed in Search Flight Tab View on Home Page` |
| 2 | Web | And | `I sign in with VETERAN user type in the Login Form on Home Page` |
| 1 | Web | When | `I search for flight with the valid PNR and invalid surname in My Trips Tab View on Home Page` |
| 1 | Web | Then | `Verify that INVALID_PNR_SEARCH warning message is displayed in the Warning dialog on Home Page` |
| 1 | Web | When | `I click the NEXT button on Homepage Slider on Home Page` |
| 1 | Web | Then | `I click the PREV button on Homepage Slider on Home Page` |
| 1 | Web | And | `I search for the status by FLIGHT_NO for the DEPARTURE flight in Flight Status Tab View on Home Page` |
| 1 | Web | And | `I enter the valid ticket number and surname in the Check In Tab View on Home Page` |
| 1 | Web | And | `I sign in with the created user's phone number in the Login Form on Home Page` |
| 1 | Web | And | `I enter the DEFAULT_OTP_CODE code in the Activation Code dialog in the Login Form on Home Page` |
| 1 | Web | And | `I click the RULES_AND_CONDITIONS link in the footer on Home Page` |
| 1 | Web | When | `I click the Forgot Password button in the Login Form on Home Page` |
| 1 | Web | When | `I click the "<param>" link in the SERVICES Header menu on Home Page` |
| 1 | Web | When | `I click the International button in the Flight Arrivals section on Home Page` |
| 1 | Web | Then | `Verify that International button is active in the Flight Arrivals section on Home Page` |
| 1 | Web | And | `Verify that destination countries are displayed in the Flight Arrivals section on Home Page` |
| 1 | Web | And | `Verify that each destination country has city links in the Flight Arrivals section on Home Page` |
| 1 | Web | When | `I click the "<param>" link in the <param> Header menu on Home Page` |
| 1 | Web | Then | `Verify that "<param>" page is opened at "<param>" from Header on Home Page` |
| 1 | Web | When | `I click the Domestic button in the Flight Arrivals section on Home Page` |
| 1 | Web | Then | `Verify that Domestic button is active in the Flight Arrivals section on Home Page` |
| 1 | Web | And | `Verify that destination city links are displayed in the Flight Arrivals section on Home Page` |
| 1 | Web | And | `I randomly fill the password in the Login Form on Home Page` |
| 1 | Web | When | `I click the password eye icon in the Login Form on Home Page` |
| 1 | Web | Then | `Verify that password input type is text in the Login Form on Home Page` |
| 1 | Web | And | `I fill the ADULT user information in the Login Form on Home Page` |
| 1 | Web | When | `I click the Remember Me link in the Login Form on Home Page` |
| 1 | Web | And | `Verify that Remember Me is checked in the Login Form on Home Page` |
| 1 | Web | And | `I click the Submit button in the Login Form on Home Page` |
| 1 | Web | And | `I search for the status by <param> with the following details in Flight Status Tab View on Home Page` |
| 1 | Web | When | `I change the ANALYTICS_COOKIES setting to false in the Change Cookie Settings dialog on Home Page` |
| 1 | Web | Then | `Verify that MAXIMUM_NUMBER_OF_INFANTS message is displayed in Search Flight Tab View on Home Page` |
| 1 | Web | When | `I click the <param> link in the footer on Home Page` |
| 1 | Web | Given | `I open the Change Cookie Settings dialog from the Cookie Bar on Home Page` |
| 1 | Web | When | `I change the ANALYTICS_COOKIES setting to true in the Change Cookie Settings dialog on Home Page` |
| 1 | Web | And | `I click the "<param>" link in the TICKET_TRANSACTIONS Header menu on Home Page` |
| 1 | Web | Then | `Verify that Member Info button displayed in the Member Menu on Home Page` |
| 1 | Web | And | `Verify that My Flights button is displayed in the Member Menu on Home Page` |
| 1 | Web | And | `Verify that Logout button is displayed in the Member Menu on Home Page` |
| 1 | Web | And | `Verify that Member Image is displayed in the Member Menu on Home Page` |
| 1 | Web | And | `Verify that Member Name area is displayed in the Member Menu on Home Page` |
| 1 | Web | When | `I click all <param> links one by one from the footer on Home Page` |
| 1 | Web | And | `I select the "<param>" arrival port for ONEWAY trip in Search Flight Tab View on Home Page` |
| 1 | Web | When | `I open the departure date calendar in Search Flight Tab View on Home Page` |
| 1 | Web | Then | `Verify that past dates are disabled in the departure date calendar on Home Page` |
| 1 | Web | When | `I click the <param> on Home Page` |
| 1 | Web | And | `I select the <param> on Home Page` |
| 1 | Web | Then | `Verify that <param> FAQ accordion is opened on Home Page` |
| 1 | Web | And | `I enter the invalid PNR and surname in the Check In Tab View on Home Page` |
| 1 | Web | Then | `Verify that error message is displayed on Check-in Tab View on Home Page` |
| 1 | Web | When | `I click the ONEWAY trip type button in Search Flight Tab View on Home Page` |
| 1 | Web | Then | `Verify that return date is not displayed in the Search Flight Tab View on Home Page` |
| 1 | Web | When | `I click the Change Ports switch button in Search Flight Tab View on Home Page` |
| 1 | Web | Then | `Verify that ports are switched in Search Flight Tab View on Home Page` |
| 1 | Web | Then | `Verify that RETURN_PORT_SELECTION_WARNING warning message is displayed in Search Flight Tab View on Home Page` |
| 1 | Web | When | `I enter the number for departure input in Search Flight Tab View on Home Page` |
| 1 | Web | Then | `Verify that departure port list is empty in Search Flight Tab View on Home Page` |
| 1 | Web | Then | `Verify that following error messages are displayed on Home Page` |
| 1 | Web | When | `I click the Logout link in the Customer Menu on Home Page` |
| 1 | Web | And | `Verify that logout dialog opened on Home Page` |
| 1 | Web | And | `I confirm the logout dialog on Home Page` |
| 1 | Web | Then | `Verify that logged out process successful on Home Page` |

## Availability Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 157 | Web | Then/When | `Verify that Availability Page opened` |
| 117 | Web | When | `I click the Continue button on Availability Page` |
| 57 | Web | When | `I select the random flight from all routes on Availability Page` |
| 36 | Web | When | `I click the Stay In button in the Upgrade Package dialog on Availability Page` |
| 15 | Web | And | `I randomly select the flight with BASIC brand for all routes on Availability Page` |
| 13 | Web | Then | `Verify that Upgrade Package dialog opened on Availability Page` |
| 11 | Web | When | `I randomly select the DIRECT flight with BASIC brand for "<param>" route on Availability Page` |
| 9 | Web | And | `I randomly select the ANY flight with BASIC brand for "<param>" route on Availability Page` |
| 8 | Web | When | `I randomly select the DIRECT flight with PREMIUM brand for "<param>" route on Availability Page` |
| 7 | Web | When | `I select the FLEX brand on Availability Page` |
| 7 | Web | When | `I randomly select the CONNECTED flight with BASIC brand for "<param>" route on Availability Page` |
| 6 | Web | And | `I randomly select the DIRECT flight for "<param>" route on Availability Page` |
| 6 | Web | When | `I select the BASIC brand on Availability Page` |
| 5 | Web | When | `I click the Upgrade button in the Upgrade Package dialog on Availability Page` |
| 5 | Web | When | `I filter the flights by CONNECTED on Availability Page` |
| 5 | Web | And | `I randomly select the ANY flight for "<param>" route on Availability Page` |
| 4 | Web | When | `I randomly select the CONNECTED flight with BASIC brand for all routes on Availability Page` |
| 4 | Web | When | `I randomly select the ANY flight with PREMIUM brand for "<param>" route on Availability Page` |
| 4 | Web | Then | `Verify that brand is not displayed for departure flight on Availability Page` |
| 3 | Web | And | `I randomly select the flight with FLEX brand for all routes on Availability Page` |
| 3 | Web | And | `I randomly select the CONNECTED flight for "<param>" route on Availability Page` |
| 3 | Web | When | `I filter the flights by DIRECT on Availability Page` |
| 3 | Web | Then | `Verify that only one-way flights are listed on Availability Page` |
| 2 | Web | And | `I randomly select the DIRECT flight with FLEX brand for "<param>" route on Availability Page` |
| 2 | Web | Then | `Verify that <n>-hour icon is not displayed in the all flight cards on Availability Page` |
| 2 | Web | Then | `Verify that <n>-hour icon is displayed in the all flight cards on Availability Page` |
| 2 | Web | When | `I randomly select the ANY flight with FLEX brand for "<param>" route on Availability Page` |
| 2 | Web | When | `I click the Flight Detail Info button for "<param>" route on Availability Page` |
| 2 | Web | Then | `Verify that Flight Detail Dialog opened on Availability Page` |
| 2 | Web | When | `I click the Add button for flex offer card on Availability Page` |
| 2 | Web | Then | `Verify that THERE_IS_NO_SANDWICH warning message is displayed in the Warning dialog on Availability Page` |
| 2 | Web | And | `I sort the flights by BY_DEPARTURE_TIME on Availability Page` |
| 2 | Web | Then | `Verify that flight list is sorted by departure time on Availability Page` |
| 2 | Web | And | `I sort the flights by BY_ASCENDING_PRICE on Availability Page` |
| 2 | Web | Then | `Verify that flight list is sorted by price on Availability Page` |
| 2 | Web | Then | `Verify that FLEX brand is displayed for departure flight on Availability Page` |
| 2 | Web | Then | `Verify that only round-trip flights are listed on Availability Page` |
| 1 | Web | And | `I randomly select the DIRECT flight with BASIC brand for all routes on Availability Page` |
| 1 | Web | And | `I randomly select the flight with PREMIUM brand for all routes on Availability Page` |
| 1 | Web | And | `I randomly select the CONNECTED flight with FLEX brand for all routes on Availability Page` |
| 1 | Web | And | `Verify that Upgrade to FLEX button is displayed in the Upgrade Package Dialog on Availability Page` |
| 1 | Web | And | `Verify that Upgrade to PREMIUM button is displayed in the Upgrade Package Dialog on Availability Page` |
| 1 | Web | And | `I randomly select the CONNECTED flight with FLEX brand for "<param>" route on Availability Page` |
| 1 | Web | And | `I randomly select the flight with ECOJET brand for all routes on Availability Page` |
| 1 | Web | And | `I check the box to unselect flex offer for the 2nd flight on Availability Page` |
| 1 | Web | And | `I randomly select the CONNECTED flight with PREMIUM brand for "<param>" route on Availability Page` |
| 1 | Web | Then | `Verify that flex offer card is not displayed on Availability Page` |
| 1 | Web | When | `I click the Exchange button on Availability Page` |
| 1 | Web | And | `I randomly choose the exchange rate on Availability Page` |
| 1 | Web | Then | `Verify that the exchange rate is changed for all flights on Availability Page` |
| 1 | Web | Then | `Verify that first flight refund icon tooltip message REFUND_ICON_EXPLANATION is displayed on Availability Page` |
| 1 | Web | And | `I sort the flights by BY_FLIGHT_DURATION on Availability Page` |
| 1 | Web | Then | `Verify that flight list is sorted by flight duration on Availability Page` |
| 1 | Web | And | `I filter the flights by ALL on Availability Page` |
| 1 | Web | Then | `Verify that ALL flights are listed on Availability Page` |
| 1 | Web | Then | `Verify that DIRECT flights are listed on Availability Page` |
| 1 | Web | Then | `Verify that CONNECTED flights are listed on Availability Page` |
| 1 | Web | When | `I select the next day in the weekly flights on Availability Page` |
| 1 | Web | Then | `Verify that next day is displayed selected on weekly flights on Availability Page` |
| 1 | Web | Then | `Verify that PREMIUM brand is displayed for departure flight on Availability Page` |
| 1 | Web | And | `I select the PREMIUM brand on Availability Page` |
| 1 | Web | And | `Verify that PREMIUM brand is displayed for return flight on Availability Page` |

## Passenger Information Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 95 | Web | And | `I click the Save button in the Contact Information sidebar on Passenger Information Page` |
| 94 | Web | When | `I fulfill all the passenger and contact information on Passenger Information Page` |
| 92 | Web | When | `I click the Continue button on Passenger Information Page` |
| 88 | Web | Then | `Verify that Passenger Information Page opened` |
| 3 | Web | And | `I fill the information for 1st passenger in the Passenger Information sidebar on Passenger Information Page` |
| 3 | Web | When | `I click the Wheelchair Service button on Passenger Information Page` |
| 2 | Web | When | `I fill the BLACKLIST_CONTACT_INFO information for 1st passenger on Passenger Information Page` |
| 2 | Web | When | `I fill the ADULT user information in the Login Form on Passenger Information Page` |
| 2 | Web | And | `I click the Sign In button in the Login Form on Passenger Information Page` |
| 1 | Web | When | `I fill the BLACKLIST_CONTACT_INFO information for 2nd passenger on Passenger Information Page` |
| 1 | Web | And | `I fill the information for 2nd passenger in the Passenger Information sidebar on Passenger Information Page` |
| 1 | Web | When | `I fill the information for 2nd passenger in the Contact Information sidebar on Passenger Information Page` |
| 1 | Web | Then | `Verify that Fill In Contact Information tab is enabled on Passenger Information Page` |
| 1 | Web | Then | `Verify that WHEELCHAIR_NOT_ELIGIBLE_48H warning message is displayed in the Wheelchair sidebar on Passenger Information Page` |
| 1 | Web | And | `Verify that wheelchair is not available because of the <n> hour restriction on Passenger Information Page` |
| 1 | Web | And | `Verify that WHEELCHAIR_MISSING_PASSENGER_INFO_ERROR error message is displayed on Passenger Information Page` |
| 1 | Web | And | `I select the following details in Wheelchair sidebar on Passenger Information Page` |
| 1 | Web | Then | `Verify that 1st passenger is added in Wheelchair sidebar on Passenger Information Page` |
| 1 | Web | And | `Verify that wheelchair service is added on Passenger Information Page` |
| 1 | Web | When | `I click the Edit button for 1st passenger on Passenger Information Page` |
| 1 | Web | And | `I edit the information for 1st passenger in the Passenger Information sidebar on Passenger Information Page` |
| 1 | Web | Then | `Verify that 1st passenger full name is displayed correctly on Passenger Information Page` |
| 1 | Web | When | `I click the browser back button on Passenger Information Page` |
| 1 | Web | Then | `Verify that ALL_SELECTION_WILL_BE_DELETED_WARNING warning message is displayed on Passenger Information Page` |
| 1 | Web | Then | `Verify that Passenger Info step is active and Availability step is completed on Passenger Information Page` |
| 1 | Web | When | `I clear the email information for 1st passenger in the Contact Information sidebar on Passenger Information Page` |
| 1 | Web | Then | `Verify that FIELD_IS_REQUIRED error message is displayed in the Contact Information sidebar on Passenger Information Page` |
| 1 | Web | When | `I fill the letter "<param>" in the firstname input for 1st passenger in the Contact Information sidebar on Passenger Information Page` |
| 1 | Web | Then | `Verify that ENTER_AT_LEAST_2_CHARACTER error message is displayed in the Contact Information sidebar on Passenger Information Page` |

## Excess Baggage Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 84 | Web | Then | `Verify that Excess Baggage Page opened` |
| 80 | Web | When | `I click the Continue button on Excess Baggage Page` |
| 34 | Web | And | `I select the no cabin baggage for all passengers on Excess Baggage Page` |
| 25 | Web/rIOS | Then | `Verify that check-in baggage is added for all flights and for all passengers on Excess Baggage Page` |
| 18 | Web | When | `I add the check-in baggage for all flights and for all passengers on Excess Baggage Page` |
| 15 | Web | Then | `Verify that Add Baggage dialog is displayed on Excess Baggage Page` |
| 13 | Web | When | `I click the Continue Without Adding button in the Add Baggage dialog on Excess Baggage Page` |
| 6 | Web | And | `Verify that Luggage Restrictions dialog is displayed on Excess Baggage Page` |
| 6 | Web | And | `I check the box to accept the luggage restrictions on Excess Baggage Page` |
| 6 | Web | And | `I click the Continue button in the Luggage Restrictions dialog on Excess Baggage Page` |
| 4 | Web | Then | `Verify that PERSONAL_ITEM allowance details control on Excess Baggage Page` |
| 4 | Web | And | `Verify that CABIN_BAGGAGE allowance details control on Excess Baggage Page` |
| 4 | Web | And | `Verify that CHECKIN_BAGGAGE allowance details control on Excess Baggage Page` |
| 3 | Web | And | `I click the Continue button in the CIP Lounge Review dialog on Excess Baggage Page` |
| 3 | Web | And | `Verify that default check-in baggage weight is <n> kg on Excess Baggage Page` |
| 2 | Web | And | `Verify that NO_SOLD_EXCESS_BAGGAGE_INFANT info message is displayed for infant on Excess Baggage Page` |
| 2 | Web | And | `Verify that Excess Baggage exit pop-up should not be displayed on Excess Baggage Page` |
| 2 | Web | Then | `Verify that check in baggage is removed for all flights and for all passengers on Excess Baggage Page` |
| 1 | Web | And | `Verify that CIP Lounge Review dialog is displayed on Excess Baggage Page` |
| 1 | Web | When | `I select the add cabin baggage for all flights and for all passengers on Excess Baggage Page` |
| 1 | Web | And | `I click the completed step icon of Seat Selection on Excess Baggage Page` |
| 1 | Web | When | `I maximize the check-in baggage capacity for first passenger on Excess Baggage Page` |
| 1 | Web | Then | `Verify that max check-in baggage capacity for first passenger on Excess Baggage Page` |
| 1 | Web | When | `I remove the baggage for all flights and for all passengers on Excess Baggage Page` |
| 1 | Web | When | `I increase the check-in baggage for all flights and for all passengers on Excess Baggage Page` |
| 1 | Web | And | `Verify that flight segments equals trip type size on Excess Baggage Page` |
| 1 | Web | And | `I click the Add Baggage button in the Add Baggage dialog on Excess Baggage Page` |
| 1 | Web | And | `Verify that active excess baggage bar and completed seat selection bar are displayed on Excess Baggage Page` |
| 1 | Web | Then | `Verify that baggage is not sold for infant passenger on Excess Baggage Page` |
| 1 | Web | And | `I click the browser back button on Excess Baggage Page` |

## Flight Management Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 48 | Web/rIOS | Then | `Verify that Flight Management Page opened` |
| 45 | Web/rIOS | And | `I click the Send Activation Code button on Flight Management Page` |
| 45 | Web/rIOS | And | `I enter the MY_TRIPS_OTP_CODE code in the Activation Code dialog on Flight Management Page` |
| 45 | Web/rIOS | And | `Verify that activation code is entered correctly on Flight Management Page` |
| 43 | Web/rIOS | And | `Verify that Activation Code dialog is displayed on Flight Management Page` |
| 26 | Web | When | `I click the CHANGE_BUTTON button on Flight Management Page` |
| 7 | Web | When | `I click the CANCEL_BUTTON button on Flight Management Page` |
| 3 | Web/rIOS | When | `I add the EXCESS_BAGGAGE service for 1st passenger on Flight Management Page` |
| 3 | Web | And | `I click the Save Changes button in Flight Management Page` |
| 2 | Web | When | `I click the CHECK_IN button on Flight Management Page` |
| 2 | Web | When | `I add the SPORT_EQUIPMENT service for 1st passenger on Flight Management Page` |
| 2 | Web | And | `I check the sms box to stay informed on Flight Management Page` |
| 1 | Web | When | `I add the CIP_LOUNGE service for 1st passenger on Flight Management Page` |
| 1 | Web | When | `I add the SEAT_SELECTION service for 1st passenger on Flight Management Page` |
| 1 | Web | When | `I delete the email value in the contact information on Flight Management Page` |
| 1 | Web | Then | `Verify that EMPTY_EMAIL_ADDRESS alert message is displayed on Flight Management Page` |
| 1 | Web | When | `I delete the firstname value in the contact information on Flight Management Page` |
| 1 | Web | Then | `Verify that FIELD_IS_REQUIRED error message is displayed in the contact information on Flight Management Page` |
| 1 | Web | When | `I delete the phone number value in the contact information on Flight Management Page` |
| 1 | Web | Then | `Verify that PRIVACY_NOTICE_REGISTERED_PASSENGER alert message is displayed on Flight Management Page` |
| 1 | Web | And | `I update the email with "<param>" in the contact information on Flight Management Page` |
| 1 | Web | Then | `Verify that INVALID_EMAIL error message is displayed in the contact information on Flight Management Page` |

## Seat Selection Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 99 | Web | Then | `Verify that Seat Selection Page opened` |
| 75 | Web | When | `I click the Continue button on Seat Selection Page` |
| 23 | Web | And | `Verify that Continue Without Selecting a Seat dialog is displayed on Seat Selection Page` |
| 23 | Web | And | `I click the Continue button in the Continue Without Selecting a Seat Dialog in the Seat Selection Page` |
| 10 | Web | When | `I continue without selecting a seat on Seat Selection Page` |
| 9 | Web | When | `I randomly select the seat for all flights and for all passengers on Seat Selection Page` |
| 7 | Web | And | `Verify that seats are selected for all passengers on Seat Selection Page` |
| 4 | Web | Then | `Verify that ALL_SELECTION_WILL_BE_DELETED_WARNING warning message is displayed in the Warning dialog on Seat Selection Page` |
| 3 | Web | When | `I select free STANDARD seat for all flights and for all passengers on Seat Selection Page` |
| 2 | Web | When | `I select the seat for all flights and for all passengers with the following details on Seat Selection Page` |
| 2 | Web | When/Then | `Verify that DISABILITIES_CANNOT_SELECT_SEAT_ONLINE warning message is displayed on Seat Selection Page` |
| 2 | Web | When | `I click the browser back button on Seat Selection Page` |
| 2 | Web | Then | `Verify that CHOOSE_YOUR_SEAT_FOR_PACKAGE warning message is displayed in the Warning dialog on Seat Selection Page` |
| 1 | Web | And | `Verify that all seats are chargeable on Seat Selection Page` |
| 1 | Web | And | `I click the completed step icon of Passenger Info on Seat Selection Page` |
| 1 | Web | And | `I remove the seat for all flights and for all passengers on Seat Selection Page` |
| 1 | Web | And | `Verify that all seats are removed on Seat Selection Page` |
| 1 | Web | When | `I select seat for flights, segments and passengers on Seat Selection Page` |
| 1 | Web | Then | `Verify that user can choose WINDOW seat on Seat Selection Page` |
| 1 | Web | And | `Verify that MIDDLE seat can not choose on Seat Selection Page` |
| 1 | Web | And | `Verify that AISLE seat can not choose on Seat Selection Page` |
| 1 | Web | Then | `Verify that flight segment count equals the flight component size on Seat Selection Page` |
| 1 | Web | When | `I click the Exchange button on Seat Selection Page` |
| 1 | Web | And | `I randomly choose the exchange rate on Seat Selection Page` |
| 1 | Web | Then | `Verify that the exchange rate is changed in the details content on Seat Selection Page` |
| 1 | Web | Then | `Verify active seat selection and completed passenger info on bar on Seat Selection Page` |

## City Guide Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 69 | Web | When/Then | `Verify that City Guide Page opened` |
| 39 | Web | And | `I click the Domestic button on City Guide Page` |
| 27 | Web | And | `I click the International button on City Guide Page` |
| 2 | Web | And | `I select the <param> combo box on City Guide Page` |
| 1 | Web | And | `Verify that LONDON city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the LONDON image on City Guide Page` |
| 1 | Web | And | `Verify that LEFKOSIA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the LEFKOSIA image on City Guide Page` |
| 1 | Web | And | `Verify that GENEVA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the GENEVA image on City Guide Page` |
| 1 | Web | And | `Verify that HURGHADA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the HURGHADA image on City Guide Page` |
| 1 | Web | And | `Verify that DUBAI city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the DUBAI image on City Guide Page` |
| 1 | Web | And | `Verify that COPENHAGEN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the COPENHAGEN image on City Guide Page` |
| 1 | Web | And | `Verify that CAIRO city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the CAIRO image on City Guide Page` |
| 1 | Web | And | `Verify that BUDAPEST city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BUDAPEST image on City Guide Page` |
| 1 | Web | And | `Verify that BRUSSELS city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BRUSSELS image on City Guide Page` |
| 1 | Web | And | `Verify that BISHKEK city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BISHKEK image on City Guide Page` |
| 1 | Web | And | `Verify that BERLIN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BERLIN image on City Guide Page` |
| 1 | Web | And | `Verify that BELGRADE city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BELGRADE image on City Guide Page` |
| 1 | Web | And | `Verify that BEIRUT city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BEIRUT image on City Guide Page` |
| 1 | Web | And | `Verify that BASEL city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BASEL image on City Guide Page` |
| 1 | Web | And | `Verify that AMSTERDAM city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the AMSTERDAM image on City Guide Page` |
| 1 | Web | And | `Verify that VAN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the VAN image on City Guide Page` |
| 1 | Web | And | `Verify that TRABZON city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the TRABZON image on City Guide Page` |
| 1 | Web | And | `Verify that TOKAT city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the TOKAT image on City Guide Page` |
| 1 | Web | And | `Verify that SIRNAK city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the SIRNAK image on City Guide Page` |
| 1 | Web | And | `Verify that SANLIURFA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the SANLIURFA image on City Guide Page` |
| 1 | Web | And | `Verify that SIVAS city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the SIVAS image on City Guide Page` |
| 1 | Web | And | `Verify that SAMSUN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the SAMSUN image on City Guide Page` |
| 1 | Web | And | `Verify that RIZE city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the RIZE image on City Guide Page` |
| 1 | Web | And | `Verify that ORDU_GIRESUN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ORDU_GIRESUN image on City Guide Page` |
| 1 | Web | And | `Verify that NEVSEHIR city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the NEVSEHIR image on City Guide Page` |
| 1 | Web | And | `Verify that MUS city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the MUS image on City Guide Page` |
| 1 | Web | And | `Verify that MARDIN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the MARDIN image on City Guide Page` |
| 1 | Web | And | `Verify that MALATYA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the MALATYA image on City Guide Page` |
| 1 | Web | And | `Verify that KONYA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the KONYA image on City Guide Page` |
| 1 | Web | And | `Verify that KAYSERI city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the KAYSERI image on City Guide Page` |
| 1 | Web | And | `Verify that KARS city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the KARS image on City Guide Page` |
| 1 | Web | And | `Verify that KAHRAMANMARAS city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the KAHRAMANMARAS image on City Guide Page` |
| 1 | Web | And | `Verify that IZMIR city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the IZMIR image on City Guide Page` |
| 1 | Web | And | `Verify that ISTANBUL city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ISTANBUL image on City Guide Page` |
| 1 | Web | And | `Verify that IGDIR city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the IGDIR image on City Guide Page` |
| 1 | Web | And | `Verify that HATAY city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the HATAY image on City Guide Page` |
| 1 | Web | And | `Verify that GAZIANTEP city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the GAZIANTEP image on City Guide Page` |
| 1 | Web | And | `Verify that ERZURUM city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ERZURUM image on City Guide Page` |
| 1 | Web | And | `Verify that ERZINCAN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ERZINCAN image on City Guide Page` |
| 1 | Web | And | `Verify that ELAZIG city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ELAZIG image on City Guide Page` |
| 1 | Web | And | `Verify that EDREMIT city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the EDREMIT image on City Guide Page` |
| 1 | Web | And | `Verify that DIYARBAKIR city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the DIYARBAKIR image on City Guide Page` |
| 1 | Web | And | `Verify that DENIZLI city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the DENIZLI image on City Guide Page` |
| 1 | Web | And | `Verify that DALAMAN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the DALAMAN image on City Guide Page` |
| 1 | Web | And | `Verify that CANAKKALE city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the CANAKKALE image on City Guide Page` |
| 1 | Web | And | `Verify that BURSA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BURSA image on City Guide Page` |
| 1 | Web | And | `Verify that BODRUM city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BODRUM image on City Guide Page` |
| 1 | Web | And | `Verify that BINGOL city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BINGOL image on City Guide Page` |
| 1 | Web | And | `Verify that BATMAN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the BATMAN image on City Guide Page` |
| 1 | Web | And | `Verify that ANTALYA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ANTALYA image on City Guide Page` |
| 1 | Web | And | `Verify that ANKARA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ANKARA image on City Guide Page` |
| 1 | Web | And | `Verify that AGRI city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the AGRI image on City Guide Page` |
| 1 | Web | And | `Verify that ADIYAMAN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ADIYAMAN image on City Guide Page` |
| 1 | Web | And | `Verify that ADANA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ADANA image on City Guide Page` |
| 1 | Web | And | `Verify that ZURICH city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ZURICH image on City Guide Page` |
| 1 | Web | And | `Verify that VIENNA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the VIENNA image on City Guide Page` |
| 1 | Web | And | `Verify that TBILISI city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the TBILISI image on City Guide Page` |
| 1 | Web | And | `Verify that STOCKHOLM city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the STOCKHOLM image on City Guide Page` |
| 1 | Web | And | `Verify that SKOPJE city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the SKOPJE image on City Guide Page` |
| 1 | Web | And | `Verify that SHARM_EL_SHEIKH city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the SHARM_EL_SHEIKH image on City Guide Page` |
| 1 | Web | And | `Verify that SARAJEVO city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the SARAJEVO image on City Guide Page` |
| 1 | Web | And | `Verify that ROME city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the ROME image on City Guide Page` |
| 1 | Web | And | `Verify that PRISHTINA city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the PRISHTINA image on City Guide Page` |
| 1 | Web | And | `Verify that PARIS city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the PARIS image on City Guide Page` |
| 1 | Web | And | `Verify that MILAN city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the MILAN image on City Guide Page` |
| 1 | Web | And | `Verify that LYON city image and href link exists on City Guide Page` |
| 1 | Web | When | `I click the LYON image on City Guide Page` |

## Payment Summary Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 78 | Web/rIOS | Then/When | `Verify that Payment Summary Page opened` |
| 68 | Web/rIOS | When | `I click the Continue button on Payment Summary Page` |
| 67 | Web/rIOS | And | `I check the box to accept the terms and conditions and continue on Payment Summary Page` |
| 3 | Web | Then | `Verify that BLACKLIST_MESSAGE warning message is displayed in the Warning dialog on Payment Summary Page` |
| 2 | Web | When | `I apply the "<param>" promotion code on Payment Summary Page` |
| 2 | Web | Then | `Verify that promotion discount is applied on Payment Summary Page` |
| 2 | Web | When | `Verify that stopover information of flight details is displayed on Payment Summary Page` |
| 1 | Web | And | `Verify that promotion code field is not displayed on Payment Summary Page` |
| 1 | Web | When | `I click the completed step icon of Additional Services on Payment Summary Page` |
| 1 | Web | Then | `Verify that GENERAL_RULES_WARNING message is displayed on Payment Summary Page` |
| 1 | Web | Then | `Verify that payment is active and additional services is completed in the step bar on Payment Summary Page` |
| 1 | Web | When | `I click the Exchange button on Payment Summary Page` |
| 1 | Web | And | `I randomly choose the exchange rate on Payment Summary Page` |
| 1 | Web | Then | `Verify that the exchange rate is changed in the details content on Payment Summary Page` |
| 1 | Web | When | `I click the Continue button in the Warning dialog on Payment Summary Page` |
| 1 | Web | And | `I click the Details button in the Progress Bar to review the details on Payment Summary Page` |
| 1 | Web | And | `I click the browser back button on Payment Summary Page` |

## Additional Services Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 91 | Web | Then/When | `Verify that Additional Services Page opened` |
| 41 | Web | When | `I click the Continue button on Additional Services Page` |
| 11 | Web | And | `Verify that EXCESS_BAGGAGE service is added on Additional Services Page` |
| 10 | Web | Then | `Verify that SEAT_SELECTION service is added on Additional Services Page` |
| 9 | Web | When | `I click the Add button for CIP_LOUNGE service type on Additional Services Page` |
| 9 | Web | When | `I click the Add button for SPORT_EQUIPMENT service type on Additional Services Page` |
| 9 | Web | Then | `Verify that SPORT_EQUIPMENT service is added on Additional Services Page` |
| 8 | Web | Then | `Verify that CIP_LOUNGE service is added on Additional Services Page` |
| 4 | Web | Then | `Verify that AJET_FLEX service is added on Additional Services Page` |
| 2 | Web | When | `I click the Add button for AJET_FLEX service type on Additional Services Page` |
| 2 | Web | When | `I click the Add button for SEAT_SELECTION service type on Additional Services Page` |
| 2 | Web | And | `I click the Edit button for EXCESS_BAGGAGE service type on Additional Services Page` |
| 2 | Web | And | `I continue without any selection on Additional Services Page` |
| 2 | Web | When | `I click the Edit button for SPORT_EQUIPMENT service type on Additional Services Page` |
| 1 | Web | When | `I click the Edit button for CIP_LOUNGE service type on Additional Services Page` |
| 1 | Web | Then | `Verify that CIP_LOUNGE service is removed on Additional Services Page` |
| 1 | Web | And | `I click the completed step icon of Excess Baggage on Additional Services Page` |
| 1 | Web | Then | `Verify that SPORT_EQUIPMENT service is displayed on Additional Services Page` |
| 1 | Web | Then | `Verify that additional services are displayed on Additional Services Page` |
| 1 | Web | When | `I click the Edit button for SEAT_SELECTION service type on Additional Services Page` |
| 1 | Web | Then | `Verify that SEAT_SELECTION service is removed on Additional Services Page` |
| 1 | Web | And | `Verify that EXCESS_BAGGAGE service is removed on Additional Services Page` |
| 1 | Web | And | `I remove the equipment for all flights and for all passengers on Additional Services Page` |
| 1 | Web | And | `Verify that equipment is removed for all passengers on Additional Services Page` |
| 1 | Web | Then | `Verify that SPORT_EQUIPMENT service is removed on Additional Services Page` |
| 1 | Web | Then | `Verify that Additional Services step is active and Seat Selection step is completed on Additional Services Page` |
| 1 | Web | When | `I click the Exchange button on Additional Services Page` |
| 1 | Web | And | `I randomly choose the exchange rate on Additional Services Page` |
| 1 | Web | Then | `Verify that the exchange rate is changed in the details content on Additional Services Page` |
| 1 | Web | And | `I click the browser back button on Additional Services Page` |

## Feedback Form Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 23 | Web | Then | `Verify that Feedback Form Page opened` |
| 12 | Web | When | `I click the Continue button in the Create New Feedback form on Feedback Form Page` |
| 11 | Web | When | `I click the category dropdown on Feedback Form Page` |
| 10 | Web | And | `I click the subject dropdown on Feedback Form Page` |
| 5 | Web | When | `I upload the file as PNG format with the name "<param>" on the Feedback Form Page` |
| 5 | Web | When | `I select the FLIGHT_IRREGULARITIES category option on Feedback Form Page` |
| 5 | Web | And | `I select the PNR option on Feedback Form Page` |
| 4 | Web | And | `I select the DELAY subject on Feedback Form Page` |
| 4 | Web | And | `I fulfill the personal details with FEEDBACK_CONTACT_INFO on Feedback Form Page` |
| 4 | Web | And | `I enter the PNR on Feedback Form Page` |
| 4 | Web | And | `I enter the message with SHORT_MESSAGE on Feedback Form Page` |
| 4 | Web | Then | `Verify that success message is displayed on Feedback Form Page` |
| 3 | Web | And | `Verify that STAFF subject is displayed on Feedback Form Page` |
| 3 | Web | When | `I enter the phone number with "<param>" on Feedback Form Page` |
| 3 | Web | And | `Verify that FIELD_IS_REQUIRED message is displayed in the Phone Number field on Feedback Form Page` |
| 2 | Web | And | `Verify that uploaded file as TXT format with the name "<param>" on Feedback Form Page` |
| 2 | Web | And | `Verify that uploaded file as PDF format with the name "<param>" on Feedback Form Page` |
| 2 | Web | And | `Verify that uploaded file as JPG format with the name "<param>" on Feedback Form Page` |
| 2 | Web | And | `Verify that uploaded file as XLSX format with the name "<param>" on Feedback Form Page` |
| 2 | Web | And | `Verify that uploaded file as DOCX format with the name "<param>" on Feedback Form Page` |
| 2 | Web | And | `Verify that uploaded file count is <n> on Feedback Form Page` |
| 2 | Web | When | `I click the My Previous Feedbacks tab on Feedback Form Page` |
| 2 | Web | And | `I enter the previous feedback number on Feedback Form Page` |
| 2 | Web | And | `I enter the email with FEEDBACK_CONTACT_INFO on Feedback Form Page` |
| 2 | Web | And | `I click the Continue button in My Previous Feedback form on Feedback Form Page` |
| 2 | Web | When | `I select the AIRPORT category option on Feedback Form Page` |
| 2 | Web | When | `I enter the email with "<param>" on Feedback Form Page` |
| 2 | Web | Then | `Verify that FIELD_IS_REQUIRED message is displayed in the Surname field on Feedback Form Page` |
| 2 | Web | Then | `Verify that FIELD_IS_REQUIRED message is displayed in the First Name field on Feedback Form Page` |
| 1 | Web | And | `I upload the file as TXT format with the name "<param>" on the Feedback Form Page` |
| 1 | Web | And | `I upload the file as PDF format with the name "<param>" on the Feedback Form Page` |
| 1 | Web | And | `I upload the file as JPG format with the name "<param>" on the Feedback Form Page` |
| 1 | Web | And | `I upload the file as XLSX format with the name "<param>" on the Feedback Form Page` |
| 1 | Web | And | `I upload the file as DOCX format with the name "<param>" on the Feedback Form Page` |
| 1 | Web | Then | `Verify that FILE_TYPE_ERROR message is displayed in the File Upload field on Feedback Form Page` |
| 1 | Web | And | `I select the STAFF subject on Feedback Form Page` |
| 1 | Web | Then | `Verify that DELAY subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that SCHEDULE_CHANGES subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that FLIGHT_CANCELLATION subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that DENIED_BOARDING subject is displayed on Feedback Form Page` |
| 1 | Web | When | `I select the DURING_FLIGHT category option on Feedback Form Page` |
| 1 | Web | Then | `Verify that CATERING subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that CABIN subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that SEAT subject is displayed on Feedback Form Page` |
| 1 | Web | Then | `Verify that BAGGAGE_PROCEDURES subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that CHECKIN_AND_BOARDING subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that LOUNGES subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that ANCILLARY_SERVICES subject is displayed on Feedback Form Page` |
| 1 | Web | Then | `Verify that email error message is not displayed on Feedback Form Page` |
| 1 | Web | Then | `Verify that INVALID_EMAIL message is displayed in the Email field on Feedback Form Page` |
| 1 | Web | Then | `Verify that RESERVATION_AND_TICKETING category option is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that FLIGHT_IRREGULARITIES category option is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that AIRPORT category option is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that DURING_FLIGHT category option is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that OTHER category option is displayed on Feedback Form Page` |
| 1 | Web | Then | `Verify that phone error message is not displayed on Feedback Form Page` |
| 1 | Web | When | `I select the RESERVATION_AND_TICKETING category option on Feedback Form Page` |
| 1 | Web | Then | `Verify that REISSUE_AND_CANCELLATION subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that TICKETING_EXPERIENCE subject is displayed on Feedback Form Page` |
| 1 | Web | Then | `Verify that FEMALE gender option is visible on Feedback Form Page` |
| 1 | Web | And | `Verify that MALE gender option is visible on Feedback Form Page` |
| 1 | Web | When | `I upload the file as JPEG format with the name "<param>" on the Feedback Form Page` |
| 1 | Web | Then | `Verify that FILE_SIZE_LIMIT message is displayed in the File Upload field on Feedback Form Page` |
| 1 | Web | Then | `Verify that text area placeholder is MESSAGE_PLACEHOLDER on Feedback Form Page` |
| 1 | Web | When | `I select the OTHER category option on Feedback Form Page` |
| 1 | Web | Then | `Verify that PERSONAL_DATA_PROTECTION subject is displayed on Feedback Form Page` |
| 1 | Web | And | `Verify that SUSTAINABILITY subject is displayed on Feedback Form Page` |
| 1 | Web | When | `I enter the message with SCROLLABLE_LONG_MESSAGE on Feedback Form Page` |
| 1 | Web | Then | `Verify that text area is scrollable on Feedback Form Page` |
| 1 | Web | And | `Verify that FIELD_IS_REQUIRED message is displayed in the Email field on Feedback Form Page` |
| 1 | Web | And | `Verify that FIELD_IS_REQUIRED message is displayed in the PNR field on Feedback Form Page` |
| 1 | Web | And | `Verify that FIELD_IS_REQUIRED message is displayed in the Message field on Feedback Form Page` |

## Thank You Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 73 | Web/rIOS | Then | `Verify that Thank You Page opened` |
| 55 | Web/rIOS | And | `Verify that PAYMENT_RECEIVED message is displayed on Thank You Page` |
| 7 | Web | Then | `Verify that FLIGHT_CHANGED message is displayed on Thank You Page` |
| 6 | Web | And | `Verify that CHECKIN_COMPLETED message is displayed on Thank You Page` |
| 3 | Web | And | `Verify that FLIGHT_CANCELLED message is displayed on Thank You Page` |
| 1 | Web | Then | `Verify that only Sport Equipment price matches the total amount on Thank You Page` |
| 1 | Web | And | `Verify that total price on Thank You Page is same as Payment Page` |
| 1 | Web | And | `Verify that the total amount on the Progress Bar is matched the total amount on the Thank You Page` |
| 1 | Web | And | `Verify that flight detail on the Progress Bar is matched the flight detail on the Thank You Page` |
| 1 | Web | When | `I click the Discover button in the Additional Services Banner on Thank You Page` |

## Payment Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 71 | Web/rIOS | When | `Verify that Payment Page opened` |
| 69 | Web/rIOS | When | `I complete the payment with WORLDPAY_CARD credit card on Payment Page` |
| 2 | Web | When | `I complete the payment with UATP_CARD credit card on Payment Page` |
| 1 | Web | When | `I complete the payment with BKM_CARD1 BKM Express on Payment Page` |
| 1 | Web | When | `I complete the payment with CREDIT_CARD_WITH_3D credit card on Payment Page` |
| 1 | Web | When | `I click the browser back button on Payment Page` |

## Contact Info Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 19 | Web | Then | `Verify that Member & Contact Info Page opened` |
| 9 | Web | And | `I click the Update button in the Edit dialog on Member & Contact Info Page` |
| 9 | Web | And | `Verify that Activation Code dialog is displayed on Member & Contact Info Page` |
| 5 | Web | Then | `Verify that nationality number is readonly on Member & Contact Info Page` |
| 5 | Web | When | `I click the email edit button on Member & Contact Info Page` |
| 4 | Web | And | `Verify that edit email dialog is opened on Member & Contact Info Page` |
| 4 | Web | And | `I enter the "<param>" email in the edit dialog on Member & Contact Info Page` |
| 4 | Web | And | `Verify that Resend button is disabled on Activation Code dialog on Member & Contact Info Page` |
| 4 | Web | When | `I wait for Activation Code to expire on Member & Contact Info Page` |
| 4 | Web | And | `Verify that Resend button is enabled in Activation Code dialog on Member & Contact Info Page` |
| 4 | Web | And | `I click the phone number edit button on Member & Contact Info Page` |
| 4 | Web | And | `Verify that edit phone number dialog is opened on Member & Contact Info Page` |
| 4 | Web | And | `I enter the "<param>" phone number in the edit dialog on Member & Contact Info Page` |
| 4 | Web | When | `I click the Cancel button in the Activation Code dialog on Member & Contact Info Page` |
| 3 | Web | And | `I click the Confirm button in the Activation Code dialog on Member & Contact Info Page` |
| 3 | Web | When | `I randomly edit the following details on Member & Contact Info Page` |
| 3 | Web | Then | `Verify that expected fields are displayed on Member & Contact Info Page` |
| 3 | Web | When | `I click the Add Discounted Passenger Type expand button on Member & Contact Info Page` |
| 2 | Web | And | `Verify that National ID is <n> digits on Member & Contact Info Page` |
| 2 | Web | When | `I click the Save Changes button for TCKN on Member & Contact Info Page` |
| 2 | Web | Then | `Verify that CHANGE_NATIONAL_ID_WARNING warning message is displayed for national ID on Member & Contact Info Page` |
| 2 | Web | Then | `Verify that FILL_TURKISH_ID_TO_VERIFY_DISCOUNT warning message is displayed on Member & Contact Info Page` |
| 2 | Web | When | `I click the Resend button in the Activation Code dialog on Member & Contact Info Page` |
| 2 | Web | Then | `Verify that timer count down from "<param>" in the Activation Code dialog in Member & Contact Info Page` |
| 2 | Web | And | `Verify that progress bar count down from <n>% in the Activation Code dialog in Member & Contact Info Page` |
| 2 | Web | Then | `Verify that phone number is not updated on Member & Contact Info Page` |
| 2 | Web | Then | `Verify that EXPIRE_OTP error message is displayed in the Activation Code dialog on Member & Contact Info Page` |
| 2 | Web | And | `Verify that timer should be shown "<param>" in Activation Code dialog on Member & Contact Info Page` |
| 2 | Web | And | `Verify that Confirm button is disabled in Activation Code dialog on Member & Contact Info Page` |
| 2 | Web | When | `I enter the INVALID_OTP_CODE code in the Activation Code dialog on Member & Contact Info Page` |
| 2 | Web | Then | `Verify that WRONG_CODE error message is displayed in the Activation Code dialog on Member & Contact Info Page` |
| 2 | Web | Then | `Verify that email address is not updated on Member & Contact Info Page` |
| 1 | Web | And | `Verify that Edit dialog is displayed on Member & Contact Info Page` |
| 1 | Web | And | `I randomly edit the email in the Edit dialog on Member & Contact Info Page` |
| 1 | Web | And | `I enter the DEFAULT_OTP_CODE code in the Activation Code dialog on Member & Contact Info Page` |
| 1 | Web | And | `Verify that activation code is entered correctly on Member & Contact Info Page` |
| 1 | Web | Then | `Verify that email address is updated on Member & Contact Info Page` |
| 1 | Web | Then | `Verify that the member information is correct on Member & Contact Info Page` |
| 1 | Web | And | `I click the VETERAN verify button on Member & Contact Info Page` |
| 1 | Web | And | `Verify that DISCOUNT_PASSENGER_UPDATE_WARNING warning message is displayed on Member & Contact Info Page` |
| 1 | Web | When | `I click the Feedback Form link in the verified discount passenger update message on Member & Contact Info Page` |
| 1 | Web | And | `I click the DISABLED_PASSENGER verify button on Member & Contact Info Page` |
| 1 | Web | And | `I select the "<param>" nationality on Member & Contact Info Page` |
| 1 | Web | And | `I enter a random TC identity number on Member & Contact Info Page` |
| 1 | Web | And | `I click the Confirm Changes button in the national ID confirmation dialog on Member & Contact Info Page` |
| 1 | Web | When | `I click the Feedback Form link in the national ID change message on Member & Contact Info Page` |
| 1 | Web | Then | `Verify that VETERAN user is already verified on Member & Contact Info Page` |

## Standalone Additional Services Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 44 | Web/rIOS | Then | `Verify that Standalone Additional Services Page opened` |
| 30 | Web/rIOS | And | `I click the Continue button on Standalone Additional Services Page` |
| 13 | Web/rIOS | Then | `Verify that EXCESS_BAGGAGE service is added on Standalone Additional Services Page` |
| 13 | Web | Then | `Verify that SEAT_SELECTION service is added on Standalone Additional Services Page` |
| 7 | Web | And | `Verify that SPORT_EQUIPMENT service is added on Standalone Additional Services Page` |
| 7 | Web | Then | `Verify that CIP_LOUNGE service is added on Standalone Additional Services Page` |
| 7 | Web | And | `Verify that MEAL_SELECTION service is added on Standalone Additional Services Page` |
| 2 | Web | And | `I click the Add button for EXCESS_BAGGAGE service type on Standalone Additional Services Page` |
| 2 | Web | And | `I click the Add button for SPORT_EQUIPMENT service type on Standalone Additional Services Page` |
| 2 | Web | When | `I click the Edit button for SEAT_SELECTION service type on Standalone Additional Services Page` |
| 1 | Web | When | `I click the Edit button for CIP_LOUNGE service type on Standalone Additional Services Page` |
| 1 | Web | Then | `Verify that CIP_LOUNGE service is removed on Standalone Additional Services Page` |
| 1 | Web | And | `I click the Add button for CIP_LOUNGE service type on Standalone Additional Services Page` |
| 1 | Web | And | `I click the Add button for MEAL_SELECTION service type on Standalone Additional Services Page` |
| 1 | Web | Then | `Verify that SEAT_SELECTION service is removed on Standalone Additional Services Page` |
| 1 | Web | When | `I click the Edit button for EXCESS_BAGGAGE service type on Standalone Additional Services Page` |
| 1 | Web | Then | `Verify that EXCESS_BAGGAGE service is removed on Standalone Additional Services Page` |

## City Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 67 | Web | And | `Verify that City Page opened` |
| 1 | Web | And | `Verify that all destination rows contain LONDON on City Page` |
| 1 | Web | And | `Verify that all destination rows contain LEFKOSIA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain GENEVA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain HURGHADA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain DUBAI on City Page` |
| 1 | Web | And | `Verify that all destination rows contain COPENHAGEN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain CAIRO on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BUDAPEST on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BRUSSELS on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BISHKEK on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BERLIN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BELGRADE on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BEIRUT on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BASEL on City Page` |
| 1 | Web | And | `Verify that all destination rows contain AMSTERDAM on City Page` |
| 1 | Web | And | `Verify that all destination rows contain VAN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain TRABZON on City Page` |
| 1 | Web | And | `Verify that all destination rows contain TOKAT on City Page` |
| 1 | Web | And | `Verify that all destination rows contain SIRNAK on City Page` |
| 1 | Web | And | `Verify that all destination rows contain SANLIURFA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain SIVAS on City Page` |
| 1 | Web | And | `Verify that all destination rows contain SAMSUN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain RIZE on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ORDU_GIRESUN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain NEVSEHIR on City Page` |
| 1 | Web | And | `Verify that all destination rows contain MUS on City Page` |
| 1 | Web | And | `Verify that all destination rows contain MARDIN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain MALATYA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain KONYA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain KAYSERI on City Page` |
| 1 | Web | And | `Verify that all destination rows contain KARS on City Page` |
| 1 | Web | And | `Verify that all destination rows contain KAHRAMANMARAS on City Page` |
| 1 | Web | And | `Verify that all destination rows contain IZMIR on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ISTANBUL on City Page` |
| 1 | Web | And | `Verify that all destination rows contain IGDIR on City Page` |
| 1 | Web | And | `Verify that all destination rows contain HATAY on City Page` |
| 1 | Web | And | `Verify that all destination rows contain GAZIANTEP on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ERZURUM on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ERZINCAN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ELAZIG on City Page` |
| 1 | Web | And | `Verify that all destination rows contain EDREMIT on City Page` |
| 1 | Web | And | `Verify that all destination rows contain DIYARBAKIR on City Page` |
| 1 | Web | And | `Verify that all destination rows contain DENIZLI on City Page` |
| 1 | Web | And | `Verify that all destination rows contain DALAMAN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain CANAKKALE on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BURSA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BODRUM on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BINGOL on City Page` |
| 1 | Web | And | `Verify that all destination rows contain BATMAN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ANTALYA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ANKARA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain AGRI on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ADIYAMAN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ADANA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ZURICH on City Page` |
| 1 | Web | And | `Verify that all destination rows contain VIENNA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain TBILISI on City Page` |
| 1 | Web | And | `Verify that all destination rows contain STOCKHOLM on City Page` |
| 1 | Web | And | `Verify that all destination rows contain SKOPJE on City Page` |
| 1 | Web | And | `Verify that all destination rows contain SHARM_EL_SHEIKH on City Page` |
| 1 | Web | And | `Verify that all destination rows contain SARAJEVO on City Page` |
| 1 | Web | And | `Verify that all destination rows contain ROME on City Page` |
| 1 | Web | And | `Verify that all destination rows contain PRISHTINA on City Page` |
| 1 | Web | And | `Verify that all destination rows contain PARIS on City Page` |
| 1 | Web | And | `Verify that all destination rows contain MILAN on City Page` |
| 1 | Web | And | `Verify that all destination rows contain LYON on City Page` |

## Baggage Tracking Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 15 | Web | And | `Verify that Baggage Tracking Page opened` |
| 10 | Web | When | `I click the New Feedback tab on Baggage Tracking Page` |
| 10 | Web | When | `I fill the new feedback form with following details on Baggage Tracking Page` |
| 10 | Web | When | `I click the Inquiry button on Baggage Tracking Page` |
| 7 | Web | When | `I click the Previous Feedback tab on Baggage Tracking Page` |
| 7 | Web | And | `I click the Login button in the Previous Feedback tab on Baggage Tracking Page` |
| 5 | Web | Then | `Verify that reference number and surname inputs are not displayed on Baggage Tracking Page` |
| 5 | Web | Then | `Verify that GENERAL_ALERT_FILL_REQUIRED_FIELDS alert message is displayed on Baggage Tracking Page` |
| 4 | Web | Then | `Verify that success created tracking and save on Baggage Tracking Page` |
| 4 | Web | And | `I fill the previous feedback form with following details on Baggage Tracking Page` |
| 2 | Web | And | `I enter the PNR No created by TDFA on Baggage Tracking Page` |
| 2 | Web | And | `I enter previous Tracking Number on Baggage Tracking Page` |
| 2 | Web | And | `I enter previous Email BAGGAGE_TRACKING_CONTACT_INFO on Baggage Tracking Page` |
| 2 | Web | And | `I enter the ticket number created by TDFA on Baggage Tracking Page` |
| 2 | Web | And | `Verify that INVALID_EMAIL message is displayed on Email field on Baggage Tracking Page` |
| 2 | Web | And | `Verify that FIELD_IS_REQUIRED message is displayed on Reference Number field on Baggage Tracking Page` |
| 2 | Web | And | `Verify that error message is not displayed on Reference Number field on Baggage Tracking Page` |
| 2 | Web | And | `Verify that FIELD_IS_REQUIRED message is displayed on Email field on Baggage Tracking Page` |
| 1 | Web | And | `I search for the flight with the following details on Baggage Tracking Page` |
| 1 | Web | Then | `Verify BAGGAGE_TRACKING_MANDATORY_ONE_OF_THREE_FIELDS message is displayed on Baggage Tracking Page` |
| 1 | Web | And | `Verify that error message is not displayed on Email field on Baggage Tracking Page` |

## Services Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 41 | Web | And | `I search for the PNR and surname on Services Page` |
| 12 | Web | And | `Verify that SEAT_SELECTION URL on Services Page` |
| 8 | Web | And | `Verify that EXCESS_BAGGAGE URL on Services Page` |
| 7 | Web | And | `Verify that CIP_LOUNGE URL on Services Page` |
| 6 | Web | And | `Verify that MEAL_SELECTION URL on Services Page` |
| 5 | Web | And | `Verify that SPORT_EQUIPMENT URL on Services Page` |
| 1 | Web | Then | `Verify that CIP_LOUNGE_CANNOT_BE_MADE_THIS_PNR warning message is displayed on Services Page` |
| 1 | Web | And | `Verify that AJET_CAFE URL on Services Page` |

## Search New Flight Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 24 | Web | When | `I search for changing the flight with the following details on Search New Flight Page` |
| 23 | Web | And | `Verify that Search New Flight Page opened` |
| 21 | Web | And | `I click the Search Flight button on Search New Flight Page` |
| 1 | Web | When | `I delete the departure input value on Search New Flight Page` |
| 1 | Web | Then | `Verify that FIELD_IS_REQUIRED error message is displayed on Search New Flight Page` |
| 1 | Web | Then | `Verify that passenger dropdown is disabled on Search New Flight Page` |
| 1 | Web | When | `I click the departure date selection on Search New Flight Page` |
| 1 | Web | Then | `Verify that past dates are disabled on Search New Flight Page` |
| 1 | Web | When | `I click the Close button in the departure input on Search New Flight Page` |
| 1 | Web | Then | `Verify that route inputs are empty on Search New Flight Page` |
| 1 | Web | When | `I click the Change Ports switch button on Search New Flight Page` |
| 1 | Web | Then | `Verify that ports are switched on Search New Flight Page` |

## My Info Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 38 | Web | Then | `Verify that My Info Page opened` |
| 20 | Web | When | `I click the Member & Contact Info link on My Info Page` |
| 11 | Web | When | `I click the Registered Passengers link on My Info Page` |
| 1 | Web | Then | `Verify that No Registered Passenger on My Info Page` |
| 1 | Web | Then | `Verify that Member & Contact Info link exists on My Info Page` |
| 1 | Web | And | `Verify that Registered Passengers link exists on My Info Page` |
| 1 | Web | And | `Verify that Account Settings link exists on My Info Page` |
| 1 | Web | And | `Verify that Contact Preferences link exists on My Info Page` |
| 1 | Web | And | `Verify that Logout link is visible on My Info Page` |
| 1 | Web | When | `I click the Contact Preferences link on My Info Page` |

## Flight Selection Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 23 | Web | Then | `Verify that Flight Selection Page opened` |
| 11 | Web | When | `I click the 1st Flight Check-in button on Flight Selection Page` |
| 9 | Web | Then | `Verify that segment and check-in button counts for flights on Flight Selection Page` |
| 5 | Web | Then | `Verify that Passenger Selection dialog opened on Flight Selection Page` |
| 4 | Web | And | `I select the all passengers in the Passenger Selection dialog on Flight Selection Page` |
| 3 | Web | Then | `Verify that 1st flight check-in button is not displayed on Flight Selection Page` |
| 2 | Web | And | `Verify that boarding pass button is displayed on Flight Selection Page` |
| 2 | Web | Then | `Verify that Online check-in inability dialog is displayed on Flight Selection Page` |
| 1 | Web | And | `Verify that boarding pass button is not displayed on Flight Selection Page` |
| 1 | Web | And | `Verify that ONLINE_CHECK_IN_INABILITY error message is displayed in the Inability dialog on Flight Selection Page` |
| 1 | Web | And | `Verify that CHECKIN_AVAILABLE_WITHIN_24_HOURS information message is displayed on Flight Selection Page` |
| 1 | Web | And | `Verify that Continue button is disabled in the Passenger Selection dialog on Flight Selection Page` |

## Standalone Seat Selection Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 15 | Web | And | `I click the Continue button on Standalone Seat Selection Page` |
| 14 | Web | And | `Verify that Standalone Seat Selection Page opened` |
| 12 | Web | And | `Verify that standalone seats are selected for all passengers on Standalone Seat Selection Page` |
| 7 | Web | When | `I randomly select the seat for all flights and for all passengers on Standalone Seat Selection Page` |
| 2 | Web | And | `I select the seat for all flights and for all passengers with the following details on Standalone Seat Selection Page` |
| 2 | Web | And | `Verify that all seats are chargeable on Standalone Seat Selection Page` |
| 2 | Web | And | `Verify that all seats are free on Standalone Seat Selection Page` |
| 1 | Web | When | `I select the chargeable FRONT_SEAT seat for all flights and for all passengers on Standalone Seat Selection Page` |
| 1 | Web | When | `I select the free STANDARD seat for all flights and for all passengers on Standalone Seat Selection Page` |
| 1 | Web | When | `I select the free FRONT_SEAT_PREMIUM seat for all flights and for all passengers on Standalone Seat Selection Page` |
| 1 | Web | When | `I select the chargeable EMERGENCY_EXIT seat for all flights and for all passengers on Standalone Seat Selection Page` |
| 1 | Web | And | `I remove the seat for all flights and for all passengers on Standalone Seat Selection Page` |
| 1 | Web | And | `Verify that all seats are removed on Standalone Seat Selection Page` |

## Flight Change Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 26 | Web | And | `Verify that Flight Change Page opened` |
| 24 | Web | And | `I select the 1st flight on Flight Change Page` |
| 1 | Web | Then | `Verify that Continue button is not enabled on Flight Change Page` |
| 1 | Web | And | `I select the 2nd flight on Flight Change Page` |

## Standalone Excess Baggage Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 15 | Web/rIOS | And | `Verify that Standalone Excess Baggage Page opened` |
| 14 | Web/rIOS | And | `I click the Continue button on Standalone Excess Baggage Page` |
| 12 | Web/rIOS | When | `I add the check-in baggage for all flights and for all passengers on Standalone Excess Baggage Page` |
| 2 | Web/rIOS | And | `I select the add cabin baggage for all flights and for all passengers on Standalone Excess Baggage Page` |
| 1 | Web | And | `I add the check-in baggage for 1st flight and for all passengers on Standalone Excess Baggage Page` |
| 1 | Web | And | `I remove the check-in baggage for all flights and for all passengers on Standalone Excess Baggage Page` |

## Registered Passengers Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 10 | Web | Then | `Verify that Registered Passengers Page opened` |
| 4 | Web | And | `I click the New Person button on Registered Passengers Page` |
| 4 | Web | When | `I click the Add Passenger button on Registered Passengers Page` |
| 3 | Web | When | `I fulfill passenger information on Registered Passengers Page` |
| 3 | Web | Then | `Verify that SAVED_REGISTERED_PASSENGER_ADDED_SUCCESSFULLY alert message is displayed on Registered Passengers Page` |
| 3 | Web | When | `I randomly edit the following details on Registered Passengers Page` |
| 2 | Web | When | `I click the delete button on Registered Passengers Page` |
| 2 | Web | And | `Verify that Delete Registered Passenger dialog is displayed on Registered Passengers Page` |
| 2 | Web | When | `I click the Accept button in the Delete Registered Passenger dialog on Registered Passengers Page` |
| 2 | Web | Then | `Verify that SAVED_REGISTERED_PASSENGER_DELETED_SUCCESSFULLY alert message is displayed on Registered Passengers Page` |
| 2 | Web | Then | `Verify that SAVED_REGISTERED_PASSENGER_UPDATED_SUCCESSFULLY alert message is displayed on Registered Passengers Page` |
| 1 | Web | And | `Verify that new passenger is displayed on Registered Passengers Page` |
| 1 | Web | Then | `Verify that "<param>" alert message is displayed on Registered Passengers Page` |
| 1 | Web | When | `I click the DOMESTIC nationality radio button on Registered Passengers Page` |
| 1 | Web | Then | `Verify that nationality Id input is displayed on Registered Passengers Page` |
| 1 | Web | Then | `Verify that expected fields are displayed on Registered Passengers Page` |

## CIP Lounge Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 9 | Web | And | `Verify that CIP Lounge Page opened` |
| 9 | Web | And | `I click the Continue button on CIP Lounge Page` |
| 7 | Web | And | `I add the CIP lounge for all flights and for all passengers on CIP Lounge Page` |
| 7 | Web | And | `Verify that CIP Lounge is added for all passengers on CIP Lounge Page` |
| 1 | Web | And | `I add cip lounge for 1st flight and for all passengers on CIP Lounge Page` |
| 1 | Web | And | `Verify that CIP Lounge is added for 1st flight passengers on CIP Lounge Page` |
| 1 | Web | Then | `Verify that no CIP Lounge is to be sold to Child and Infant on CIP Lounge Page` |
| 1 | Web | And | `I remove the CIP lounge for all flights and for all passengers on CIP Lounge Page` |
| 1 | Web | And | `Verify that CIP Lounge is removed for all passengers on CIP Lounge Page` |
| 1 | Web | Then | `Verify that no standalone CIP Lounge is to be sold to Child and Infant on CIP Lounge Page` |
| 1 | Web | And | `I remove standalone cip lounge for all flights and for all passengers on CIP Lounge Page` |
| 1 | Web | And | `Verify that standalone CIP Lounge is removed for all passengers on CIP Lounge Page` |

## Apis Form Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 7 | Web | Then | `Verify that Apis Form Page opened` |
| 7 | Web | And | `I check the box to accept terms and rules on Apis Form Page` |
| 6 | Web | And | `I click the Continue button on Apis Form Page` |
| 4 | Web | And | `I fill the required information for passengers in the sidebar on Apis Form Page` |
| 2 | Web | And | `I click the Fill button for the 1st ADULT passenger on Apis Form Page` |
| 2 | Web | When | `I select the document holder nationality with GERMANY in the sidebar on Apis Form Page` |
| 2 | Web | And | `I click the Save and Continue button in the sidebar on Apis Form Page` |
| 1 | Web | And | `I select the passport issuing country with GERMANY in the sidebar on Apis Form Page` |
| 1 | Web | And | `I enter the passport number in the sidebar on Apis Form Page` |
| 1 | Web | And | `I enter the passport expiry date in the sidebar on Apis Form Page` |
| 1 | Web | When | `I select the identity document in the sidebar on Apis Form Page` |
| 1 | Web | And | `Verify that identity card number input is limited to <n> characters in the sidebar on Apis Form Page` |
| 1 | Web | And | `I enter the identity card number in the sidebar on Apis Form Page` |
| 1 | Web | And | `I enter the document expiry date in the sidebar on Apis Form Page` |
| 1 | Web | Then | `Verify that Continue button is disabled in the Details container on Apis Form Page` |

## Campaigns Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 15 | Web | Then | `Verify that Campaigns Page opened` |
| 3 | Web | When | `I click the More Info button in the any active campaign card on Campaigns Page` |
| 2 | Web | And | `Verify that Previous Campaign cards are displayed on Campaigns Page` |
| 2 | Web | When | `I click the Details button in the any Special Discount card on Campaigns Page` |
| 2 | Web | When | `I click the More Info button in the any previous campaign card on Campaigns Page` |
| 1 | Web | When | `I click the Show all link in the Destinations section on Campaigns Page` |
| 1 | Web | And | `Verify that Active Campaign cards are displayed on Campaigns Page` |
| 1 | Web | When | `I click the Privacy Policy link on Campaigns Page` |
| 1 | Web | And | `I fulfill the CONTACT_INFO contact information on Campaigns Page` |
| 1 | Web | And | `I check the box to accept the privacy policy on Campaigns Page` |
| 1 | Web | When | `I click the Subscribe button on Campaigns Page` |
| 1 | Web | Then | `Verify that SUBSCRIBE_SUCCESSFULLY_SAVED alert message is displayed on Campaigns Page` |
| 1 | Web | And | `I click the More Info button in the 1st active campaign card on Campaigns Page` |
| 1 | Web | And | `Verify that first Previous Campaign card is active on Campaigns Page` |
| 1 | Web | When | `I click the NEXT and PREV buttons on Previous Campaigns Slider on Campaigns Page` |
| 1 | Web | Then | `Verify that Previous Campaigns Slider buttons work on Campaigns Page` |

## Sports Equipment Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 10 | Web | Then | `Verify that Sports Equipment Page opened` |
| 7 | Web | When | `I add the equipment for all flights and for all passengers on Sports Equipment Page` |
| 5 | Web | And | `Verify that equipment is added for all passengers on Sports Equipment Page` |
| 3 | Web | And | `Verify that equipment quantity is increased for all passengers on Sports Equipment Page` |
| 2 | Web | And | `I increase the equipment count for all flights and for all passengers on Sports Equipment Page` |
| 1 | Web | And | `I increase the equipment count to the maximum for each passenger on all flights on Sports Equipment Page` |
| 1 | Web | And | `Verify that no equipment is to be sold to infant passenger on Sports Equipment Page` |
| 1 | Web | And | `Verify that equipment is added for 1st flight passengers on Sports Equipment Page` |
| 1 | Web | Then | `Verify that connecting flight segments are counted on Sports Equipment Page` |
| 1 | Web | And | `Verify that flight panel count matches trip route count on Sports Equipment Page` |

## Standalone CIP Lounge Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 9 | Web | And | `Verify that Standalone CIP Lounge Page opened` |
| 8 | Web | And | `I click the Continue button on Standalone CIP Lounge Page` |
| 7 | Web | And | `I add the lounge for all flights and for all passengers on Standalone CIP Lounge Page` |
| 6 | Web | And | `Verify that standalone CIP Lounge is added for all passengers on Standalone CIP Lounge Page` |
| 1 | Web | Then | `Verify that Miles&Smiles information message with MILES_AND_SMILES_TO_CIP_LOUNGE on Standalone CIP Lounge Page` |
| 1 | Web | And | `Verify that Miles&Smiles information message with MILES_AND_SMILES_ELITE_PLUS_CIP_LOUNGE on Standalone CIP Lounge Page` |

## Cancellation Summary Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 7 | Web | Then | `Verify that Cancellation Summary Page opened` |
| 4 | Web | And | `I check the box to confirm the amount on Cancellation Summary Page` |
| 4 | Web | When | `I click the Complete Transaction button on Cancellation Summary Page` |
| 3 | Web | And | `I click the Continue button in the Cancellation Confirmation dialog on Cancellation Summary Page` |
| 2 | Web | And | `Verify that Cancellation Confirmation dialog is opened on Cancellation Summary Page` |
| 1 | Web | When | `I click the browser back button on Cancellation Summary Page` |
| 1 | Web | Then | `Verify that warning dialog is displayed on Cancellation Summary Page` |
| 1 | Web | And | `I click the Continue button in the Warning dialog on Cancellation Summary Page` |
| 1 | Web | And | `I click the Cancel button in the Cancellation Confirmation dialog on Cancellation Summary Page` |

## Standalone Sports Equipment Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 8 | Web | And | `Verify that Standalone Sports Equipment Page opened` |
| 7 | Web | And | `I add the equipment for all flights and for all passengers on Standalone Sports Equipment Page` |
| 6 | Web | And | `Verify that equipment is added for all passengers on Standalone Sports Equipment Page` |
| 1 | Web | And | `I add the equipment for 1st flight and for all passengers on Standalone Sports Equipment Page` |

## Standalone Meal Selection Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 7 | Web | And | `Verify that Standalone Meal Selection Page opened` |
| 7 | Web | And | `I click the Continue button on Standalone Meal Selection Page` |
| 4 | Web | When | `I randomly select the ANY meal from the ALL meal section for all passengers on Standalone Meal Selection Page` |
| 1 | Web | When | `I add maximum ANY meal from the ALL meal section for 1st passenger on Standalone Meal Selection Page` |
| 1 | Web | When | `I add ANY meal from the ALL meal section for ADULT passengers on Standalone Meal Selection Page` |
| 1 | Web | When | `I randomly select the ANY meal from the ALL meal section for the 1st flight for all passengers on Standalone Meal Selection Page` |

## CheckIn Summary Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 6 | Web | And | `Verify that CheckIn Summary Page opened` |
| 6 | Web | And | `I check the box to accept terms and conditions on CheckIn Summary Page` |
| 6 | Web | And | `I click the Continue button on CheckIn Summary Page` |

## Flight Status List Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 7 | Web | And | `Verify that Flight Status List Page opened` |
| 4 | Web | When | `I click the Copy URL button of the flight that searching for on the Flight Status List Page` |
| 3 | Web | Then | `Verify that selected date matches the flight dates on Flight Status List Page` |
| 3 | Web | And | `Verify that selected routes match the flight routes on Flight Status List Page` |
| 1 | Web | Then | `Verify that "<param>" alert message is displayed on the Flight Status List Page` |

## Account Settings Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 4 | Web | Then | `Verify that Account Settings Page opened` |
| 1 | Web | When | `I click the Delete My Account button on Account Settings Page` |
| 1 | Web | And | `And I click the OK button in the Delete Account dialog on Account Settings Page` |
| 1 | Web | And | `I fill the current and new password on Account Settings Page` |
| 1 | Web | And | `I click the all password eye icons on Account Settings Page` |
| 1 | Web | Then | `Verify that password input types are text on Account Settings Page` |
| 1 | Web | When | `I fill new password with "<param>" on Account Settings Page` |
| 1 | Web | Then | `Verify password CONTAIN_LOWERCASE_UPPERCASE rule icon is "<param>" on Account Settings Page` |
| 1 | Web | And | `Verify password CONTAIN_NUMBER rule icon is "<param>" on Account Settings Page` |
| 1 | Web | And | `Verify password CONTAIN_SPECIAL_CHARACTER rule icon is "<param>" on Account Settings Page` |
| 1 | Web | And | `Verify password NOT_CONTAIN_3_CONSECUTIVE_CHARACTER rule icon is "<param>" on Account Settings Page` |
| 1 | Web | And | `Verify password NOT_CONTAIN_TURKISH_CHARACTERS rule icon is "<param>" on Account Settings Page` |
| 1 | Web | And | `Verify password BETWEEN_8_16_CHARACTERS rule icon is "<param>" on Account Settings Page` |

## Sign Up Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | And | `Verify that Sign Up Page opened` |
| 2 | Web | When | `I fulfill the new user information on Sign Up Page` |
| 2 | Web | And | `I check the box to accept the Terms of Conditions and Privacy Rules on Sign Up Page` |
| 2 | Web | And | `I click the Sign up button on Sign Up Page` |
| 2 | Web | And | `Verify that Activation Code dialog is displayed on Sign Up Page` |
| 2 | Web | And | `I enter the DEFAULT_OTP_CODE code in the Activation Code dialog on Sign Up Page` |
| 2 | Web | And | `Verify that activation code is entered correctly on Sign Up Page` |
| 1 | Web | And | `I select the "<param>" channel in the Activation Channel dialog on Sign Up Page` |
| 1 | Web | And | `Verify that new user is created on Sign Up Page` |

## Stay Informed About Us Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | Then | `Verify that SUBSCRIBE_SUCCESSFULLY_SAVED alert message is displayed on Stay Informed About Us Page` |
| 2 | Web | And | `I click the Stop Receiving Notifications tab on Stay Informed About Us Page` |
| 1 | Web | And | `I fulfill the CONTACT_INFO contact information on Stay Informed About Us Page` |
| 1 | Web | And | `I check the box to accept the terms and conditions and subscribe on Stay Informed About Us Page` |
| 1 | Web | When | `I check the box to communicate via email on Stay Informed About Us Page` |
| 1 | Web | And | `I click the subscribe button on Stay Informed About Us Page` |
| 1 | Web | When | `I fill only CONTACT_INFO email address on Stay Informed About Us Page` |
| 1 | Web | And | `I click the Unsubscribe button on Stay Informed About Us Page` |
| 1 | Web | When | `I click the General Terms and Conditions link on Receive Campaign Notifications on Stay Informed About Us Page` |
| 1 | Web | When | `I click the Privacy Policy link in the Receive Campaign Notifications tab on Stay Informed About Us Page` |
| 1 | Web | When | `I click the Privacy Notice link in the Receive Campaign Notifications tab on Stay Informed About Us Page` |
| 1 | Web | When | `I click the Personal Data Announcement link in the Receive Campaign Notifications tab on Stay Informed About Us Page` |
| 1 | Web | When | `I click the Personal Data Announcement link in the Stop Receiving Notifications tab on Stay Informed About Us Page` |

## Flight Change Summary Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 7 | Web | And | `I proceed to payment after confirming total price on Flight Change Summary Page` |
| 4 | Web | And | `Verify that Flight Change Summary Page opened` |
| 1 | Web | Then | `Verify that cannot proceed to payment without confirming total amount on Flight Change Summary Page` |
| 1 | Web | Then | `Verify that New Flight with PREMIUM brand and Old Flight with BASIC brand are displayed on Flight Change Summary Page` |

## Flight Status Detail Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 3 | Web | Then | `Verify that Flight Status Detail Page opened` |
| 3 | Web | And | `Verify that page URL is valid on Flight Status Detail Page` |
| 3 | Web | And | `Verify that flight number is matches the flight that searching for on Flight Status Detail Page` |
| 1 | Web | And | `Verify that flight date is displayed on Flight Status Detail Page` |
| 1 | Web | And | `Verify that routes are displayed on Flight Status Detail Page` |
| 1 | Web | And | `Verify that boarding gate is displayed on Flight Status Detail Page` |

## Sport Equipment Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 10 | Web | And | `I click the Continue button on Sport Equipment Page` |

## Campaigns Detail Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 4 | Web | Then | `Verify that Campaigns Detail Page opened` |
| 1 | Web | Then | `Verify that selected Previous Campaign is opened on Campaigns Detail Page` |
| 1 | Web | Then | `Verify that selected Active Campaign is opened on Campaigns Detail Page` |
| 1 | Web | When | `I book for the flight with the following details on Campaigns Detail Page` |
| 1 | Web | And | `I click the Search Flight button on Campaigns Detail Page` |
| 1 | Web | And | `Verify that Book Now button is displayed on Campaigns Detail Page` |
| 1 | Web | When | `I click the Book Now button on Campaigns Detail Page` |

## My Flights Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | And | `Verify that My Flights Page opened` |
| 2 | Web | When | `I click the "<param>" tab on My Flights Page` |
| 1 | Web | And | `I click the Add Flight button in the My Future Flights tab on My Flights Page` |
| 1 | Web | And | `Verify that Add Flight dialog opened on My Flights Page` |
| 1 | Web | And | `I enter the PNR in the Add Flight dialog opened on My Flights Page` |
| 1 | Web | Then | `Verify that the created PNR is matched the PNR of the first flight card on My Flights Page` |
| 1 | Web | Then | `Verify that "<param>" heading is displayed in the My Future Flights tab on My Flights Page` |

## Forgot Password Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | And | `Verify that Forgot Password Page opened` |
| 1 | Web | And | `I enter the email address of ADULT3 user title in the email input field on Forgot Password Page` |
| 1 | Web | And | `I click the Continue button on Forgot Password Page` |
| 1 | Web | And | `Verify that Information dialog is displayed on Forgot Password Page` |
| 1 | Web | And | `I click the Send button in the Information dialog is displayed on Forgot Password Page` |
| 1 | Web | And | `I enter the DEFAULT_OTP_CODE on Forgot Password Page` |
| 1 | Web | And | `I enter the new password with "<param>" in the password input field on Forgot Password Page` |
| 1 | Web | And | `I click the Create My Password button on Forgot Password Page` |
| 1 | Web | Then | `Verify that PASSWORD_UPDATED_SUCCESSFULLY message is displayed in the Password Updated dialog on Forgot Password Page` |

## Standalone Sport Equipment Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 7 | Web | And | `I click the Continue button on Standalone Sport Equipment Page` |
| 1 | Web | Then | `Verify that MAXIMUM_SPEQ_SELECTION_INFO info message is displayed on Standalone Sport Equipment Page` |

## Flight Cancellation Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 7 | Web | When | `Verify that Flight Cancellation Page opened` |
| 1 | Web | Then | `Verify that Continue button is disabled on Flight Cancellation Page` |

## Success Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 4 | Web | Then | `Verify that personal information with BAGGAGE_TRACKING_CONTACT_INFO and GERMANY_ADDRESS on Success Page of Baggage Tracking Page` |
| 2 | Web | And | `Verify that ticket number is displayed on Success Page of Baggage Tracking Page` |
| 1 | Web | Then | `Verify that PNR no is displayed on Success Page of Baggage Tracking Page` |
| 1 | Web | And | `Verify that flight information is displayed on Success Page of Baggage Tracking Page` |

## Flex Offer Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | And | `Verify that Flex Offer Page opened` |
| 2 | Web | And | `I click the Continue button on Flex Offer Page` |
| 1 | Web | And | `I check the box to select flex offer for the 1st flight on Flex Offer Page` |
| 1 | Web | And | `I click the Add button for flex offer card on Flex Offer Page` |

## Special Discount Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | Then | `Verify that selected Special Discount Page opened` |
| 1 | Web | Then | `Verify that Special Discount title is displayed on Special Discount Page` |
| 1 | Web | And | `Verify that Special Discount details are displayed on Special Discount Page` |
| 1 | Web | And | `Verify that Fare Notes link is displayed on Special Discount Page` |

## Info Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 4 | Web | When | `I click the Account Settings link on my Info Page` |

## Passenger Info Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 3 | Web | And | `I fill the contact information with BLACKLIST_CONTACT_INFO on Passenger Info Page` |
| 1 | Web | When | `I click the completed step icon of Availability on Passenger Info Page` |

## Feedback Form Received Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | And | `I save the registration number on Feedback Form Received Page` |
| 2 | Web | And | `I click the feedback button on Feedback Form Received Page` |

## Feedback Previous Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | Then | `Verify that Feedback Previous Page Form is opened` |
| 1 | Web | And | `Verify that category is FLIGHT_IRREGULARITIES on Feedback Previous Page` |
| 1 | Web | And | `Verify that subject is DELAY on Feedback Previous Page` |

## Rules And Conditions Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | Then | `Verify that Rules And Conditions Page opened` |
| 1 | Web | When | `I click the <param> button on Rules And Conditions Page` |

## Check-in Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | When | `I click the Login button in the Header on Check-in Page` |
| 1 | Web | And | `I sign in with ADULT user type in the Login Form on Check-in Page` |
| 1 | Web | Then | `Verify that login process was successful on Check-in Page` |

## Privacy And Cookie Policy Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | Then | `Verify that PRIVACY_NOTICE URL is valid on Privacy And Cookie Policy Page` |
| 1 | Web | Then | `Verify that Privacy And Cookie Policy Page opened` |

## Flight Cancel Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | When | `I select the all flights on Flight Cancel Page` |

## Add Summary Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Continue to Payment button is not enabled on Add Summary Page` |
| 1 | Web | And | `Verify that ONCE_YOU_CONFIRM_THE_AMOUNT info message is displayed on Add Summary Page` |

## LONDON Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to LONDON Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to LONDON Page title is displayed` |

## LEFKOSIA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to LEFKOSIA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to LEFKOSIA Page title is displayed` |

## GENEVA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to GENEVA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to GENEVA Page title is displayed` |

## HURGHADA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to HURGHADA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to HURGHADA Page title is displayed` |

## DUBAI Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to DUBAI Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to DUBAI Page title is displayed` |

## COPENHAGEN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to COPENHAGEN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to COPENHAGEN Page title is displayed` |

## CAIRO Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to CAIRO Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to CAIRO Page title is displayed` |

## BUDAPEST Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BUDAPEST Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BUDAPEST Page title is displayed` |

## BRUSSELS Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BRUSSELS Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BRUSSELS Page title is displayed` |

## BISHKEK Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BISHKEK Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BISHKEK Page title is displayed` |

## BERLIN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BERLIN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BERLIN Page title is displayed` |

## BELGRADE Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BELGRADE Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BELGRADE Page title is displayed` |

## BEIRUT Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BEIRUT Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BEIRUT Page title is displayed` |

## BASEL Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BASEL Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BASEL Page title is displayed` |

## AMSTERDAM Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to AMSTERDAM Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to AMSTERDAM Page title is displayed` |

## VAN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to VAN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to VAN Page title is displayed` |

## TRABZON Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to TRABZON Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to TRABZON Page title is displayed` |

## TOKAT Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to TOKAT Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to TOKAT Page title is displayed` |

## SIRNAK Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to SIRNAK Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to SIRNAK Page title is displayed` |

## SANLIURFA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to SANLIURFA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to SANLIURFA Page title is displayed` |

## SIVAS Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to SIVAS Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to SIVAS Page title is displayed` |

## SAMSUN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to SAMSUN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to SAMSUN Page title is displayed` |

## RIZE Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to RIZE Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to RIZE Page title is displayed` |

## ORDU_GIRESUN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ORDU_GIRESUN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ORDU_GIRESUN Page title is displayed` |

## NEVSEHIR Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to NEVSEHIR Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to NEVSEHIR Page title is displayed` |

## MUS Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to MUS Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to MUS Page title is displayed` |

## MARDIN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to MARDIN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to MARDIN Page title is displayed` |

## MALATYA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to MALATYA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to MALATYA Page title is displayed` |

## KONYA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to KONYA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to KONYA Page title is displayed` |

## KAYSERI Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to KAYSERI Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to KAYSERI Page title is displayed` |

## KARS Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to KARS Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to KARS Page title is displayed` |

## KAHRAMANMARAS Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to KAHRAMANMARAS Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to KAHRAMANMARAS Page title is displayed` |

## IZMIR Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to IZMIR Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to IZMIR Page title is displayed` |

## ISTANBUL Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ISTANBUL Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ISTANBUL Page title is displayed` |

## IGDIR Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to IGDIR Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to IGDIR Page title is displayed` |

## HATAY Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to HATAY Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to HATAY Page title is displayed` |

## GAZIANTEP Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to GAZIANTEP Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to GAZIANTEP Page title is displayed` |

## ERZURUM Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ERZURUM Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ERZURUM Page title is displayed` |

## ERZINCAN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ERZINCAN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ERZINCAN Page title is displayed` |

## ELAZIG Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ELAZIG Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ELAZIG Page title is displayed` |

## EDREMIT Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to EDREMIT Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to EDREMIT Page title is displayed` |

## DIYARBAKIR Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to DIYARBAKIR Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to DIYARBAKIR Page title is displayed` |

## DENIZLI Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to DENIZLI Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to DENIZLI Page title is displayed` |

## DALAMAN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to DALAMAN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to DALAMAN Page title is displayed` |

## CANAKKALE Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to CANAKKALE Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to CANAKKALE Page title is displayed` |

## BURSA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BURSA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BURSA Page title is displayed` |

## BODRUM Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BODRUM Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BODRUM Page title is displayed` |

## BINGOL Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BINGOL Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BINGOL Page title is displayed` |

## BATMAN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to BATMAN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to BATMAN Page title is displayed` |

## ANTALYA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ANTALYA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ANTALYA Page title is displayed` |

## ANKARA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ANKARA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ANKARA Page title is displayed` |

## AGRI Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to AGRI Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to AGRI Page title is displayed` |

## ADIYAMAN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ADIYAMAN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ADIYAMAN Page title is displayed` |

## ADANA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ADANA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ADANA Page title is displayed` |

## ZURICH Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ZURICH Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ZURICH Page title is displayed` |

## VIENNA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to VIENNA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to VIENNA Page title is displayed` |

## TBILISI Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to TBILISI Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to TBILISI Page title is displayed` |

## STOCKHOLM Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to STOCKHOLM Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to STOCKHOLM Page title is displayed` |

## SKOPJE Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to SKOPJE Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to SKOPJE Page title is displayed` |

## SHARM_EL_SHEIKH Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to SHARM_EL_SHEIKH Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to SHARM_EL_SHEIKH Page title is displayed` |

## SARAJEVO Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to SARAJEVO Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to SARAJEVO Page title is displayed` |

## ROME Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to ROME Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to ROME Page title is displayed` |

## PRISHTINA Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to PRISHTINA Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to PRISHTINA Page title is displayed` |

## PARIS Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to PARIS Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to PARIS Page title is displayed` |

## MILAN Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to MILAN Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to MILAN Page title is displayed` |

## LYON Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Book Flights to LYON Page URL is correct` |
| 1 | Web | And | `Verify that Book Flights to LYON Page title is displayed` |

## Personal Data Announcement Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 2 | Web | Then | `Verify that Personal Data Announcement Page opened` |

## Contact Preferences Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that Contact Preferences Page opened` |

## Ajet Cafe Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | Web | Then | `Verify that menu pages are displayed on Ajet Cafe Page` |

## Android Home Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | And | And | `Android Home Page opened` |

## Android Booking Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | And | And | `I search for flights by datatable on Android Booking Page` |

## Ajet Android Availability Page

| Kull. | Kanal | Anahtar | Step |
|---:|---|---|---|
| 1 | And | Then | `Verify that free cancellation <n>-hour icon should not be shown on Ajet Android Availability Page` |

## Sık kullanılan data table başlıkları

| Kull. | Sütunlar |
|---:|---|
| 293 | `passengerType \| quantity` |
| 190 | `departurePort \| departureDate \| arrivalPort` |
| 148 | `ports \| flightHours \| packageId` |
| 146 | `tripType \| ports \| dayToFlights \| passengers` |
| 136 | `ports \| daysToFlight \| packageId` |
| 105 | `ports \| departureDate` |
| 103 | `packageName \| isConnected` |
| 94 | `flightIndex \| passengerIndex \| nationality \| apisFormGroupId \| visaOrResidenceDocIssueLocation` |
| 39 | `flightIndex \| passengerIndex` |
| 34 | `flightIndex \| passengerIndex \| quantity` |
| 34 | `flightIndex \| segmentIndex` |
| 33 | `passengerIndex \| isElligibleForCheckin \| isBoardingCardPrintable \| reason \| isChecked \| selectedSeatCount` |
| 32 | `flightIndex \| isElligibleForCheckIn \| isConnected \| isBoardingCardPrintable \| reason \| passengerCheckInStatus` |
| 29 | `BASIC \| true` |
| 28 | `ports \| dayToFlights` |
