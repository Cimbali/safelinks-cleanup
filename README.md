# Safelinks Cleanup

[![Thunderbird add-on version][addon_version_badge]![Thunderbird add-on rating][addon_rating_badge]][addon_page]

In case the Advanced Outlook.com security for Microsoft 365 subscribers is turned on, many links are changed to be in the form of https://eur01.safelinks.protection.outlook.com/?url=https.... instead of the original link.

This add-on undos that process so that the original link is instead used in the message.
It decodes the rewritten URL and inserts the original URL instead.

Forked from @mkmelin’s [Safelinks Offr](https://github.com/mkmelin/safelinks-offr)

[addon_page]: https://addons.thunderbird.net/thunderbird/addon/safelinks-cleanup/
[addon_version_badge]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Faddons.thunderbird.net%2Fapi%2Fv4%2Faddons%2Faddon%2Fsafelinks-cleanup%2F&query=%24.ratings.bayesian_average&logo=Thunderbird&label=add-on%20version
[addon_rating_badge]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Faddons.thunderbird.net%2Fapi%2Fv4%2Faddons%2Faddon%2Fsafelinks-cleanup%2F&query=%24.current_rating.rating&logo=Thunderbird&label=add-on%20rating
