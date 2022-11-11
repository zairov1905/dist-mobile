(function ($) {
  /**
   * reset form
   */
  $("#resetFunction").on("click", function () {
    // $("#reset-filter-search-form").reset()
    $("#reset-filter-search-form")
      .find("input:text, input:password, input:file, .number, textarea")
      .val("");
    $("#reset-filter-search-form")
      .find("input:radio, input:checkbox")
      .prop("checked", false)
      .prop("selected", false);
    $("#sale").prop("checked", true);

    // input[id="parentId"]
    // $(`input[id=new-building-sale]`).prop("checked",true);
    $("#reset-filter-search-form")
      .find("select")
      .not(".searchCity")
      .prop("selectedIndex", -1)
      .trigger("change");
    $(".search-container-body__form__result").html("");
    $("#mCSB_1_container").html("");
    document.querySelectorAll(".locationsClickFunction").forEach((item) => {
      item.classList.remove("selected");
    });

    selectedLocations = [];
  });

  /**
   * Add number
   */
  var max_number = 2; //maksimum icaze verilen nomre sayi
  var wrapper = $(".number-list"); //Fields wrapper
  var add_button = $(".add_field_button"); // Elave etmek button

  var x = 1; //ilkin nomre sayi
  $(add_button).on("click", function (e) {
    e.preventDefault();
    if (x < max_number) {
      x++;
      $(wrapper).append(
        `<div class="number-list__item flex flex-middle">
            <div class="input-wrapper flex-grow m-b-12">
                <input type="text" class="input-control input-control-lg label-dark focus-placeholder" placeholder="(000) 000-00-00" data-mask="(000) 000-00-00">
                <label for="" class="floating-label">Telefon ${x}</label>
            </div>
            <span class="number-list__item__remove icon-trash c-pointer color-red-300 fs-16 m-l-12 m-r-8 m-b-12"></span>
        </div>`
      ); //add input box
    }
    if (x >= max_number) {
      add_button.hide();
    }
  });

  $(wrapper).on("click", ".number-list__item__remove", function (e) {
    //silmek buttonu
    e.preventDefault();
    $(this).parent("div").remove();
    x--;
    if (x < max_number) {
      add_button.show();
    }
  });

  /**
   * Add Trasnfer Button
   */
  var max_number2 = 10; //maksimum icaze verilen nomre sayi
  var add_button2 = $("#add_transfer_button"); // Elave etmek button
  var wrapper2 = $(".balance-transfer-list");
  var x = 1; //ilkin transfer sayi

  $("#balance-transfer-modal").on("click", add_button2, function (e) {
    e.preventDefault();
    var wrapper2 = $(".balance-transfer-list");

    //Fields wrapper
    var wrappercontent = $(`
        <div  class="balance-transfer-list__item">
        <div class="row gutter-12 flex-grow">
            <div class="col-4">
                <div class="input-wrapper">
                    <label class="default-label">KİMDƏN</label>
                    <div class="input-wrapper select-md has-icon">
                        <select class="input-control input-control-md select-modal" data-placeholder="Agentin adı">
                            <option>
                                <!-- Placeholder üçün boş qalmalıdır -->
                            </option>
                            <option value="0" disabled="disabled">Premium Əmlak (premium-emlak@mail.ru)</option>
                        </select>
                        <span class="input-icon icon-chevron-down fs-20"></span>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="input-wrapper">
                    <label class="default-label">KİMƏ</label>
                    <div class="input-wrapper select-md has-icon">
                        <select class="input-control input-control-md select-modal" data-placeholder="Göndərilən hesab">
                            <option>
                                <!-- Placeholder üçün boş qalmalıdır -->
                            </option>
                            <option value="0" selected="selected">Premium Əmlak (premium-emlak@mail.ru)</option>
                        </select>
                        <span class="input-icon icon-chevron-down fs-20"></span>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="input-wrapper">
                    <label class="default-label">MƏBLƏĞ (AZN)</label>
                    <input type="text" class="input-control input-control-md placeholder-show">
                </div>
            </div>
            <div class="col-2">
                <div class="input-wrapper">
                    <label class="default-label">ELANLAR (SAY)</label>
                    <input type="text" class="input-control input-control-md placeholder-show">
                </div>
            </div>
        </div>
        <span class="balance-transfer-list__remove icon-trash"></span>
    </div>
        `);
    console.log(e.target.getAttribute("click-id"));
    if (
      x < max_number2 &&
      wrapper2 &&
      e.target.getAttribute("click-id") == "add"
    ) {
      x++;
      wrapper2.append(wrappercontent); //add input box
    }
  });

  $("#balance-transfer-modal").on(
    "click",
    ".balance-transfer-list__remove",
    function (e) {
      //silmek buttonu
      e.preventDefault();
      $(this).parent("div").remove();
      x--;
    }
  );
  /**
   * Search Location
   */

  var selectedLocations = [];
  var searchResult;
  function pushSelectedLocations(id, parentId, name) {
    selectedLocations.push({
      id: id,
      parentId: parentId,
      name: name,
    });
  }
  function innerHtml(locationParent, parentId) {
    if (locationParent) {
      searchResult = `<span class="search-locations__list__item location-parent  selected" parent=${parentId}>${locationParent}</span>`;
    } else if (!locationParent && !parentId) {
      searchResult = selectedLocations.map(
        (selectedLocation) =>
          `<span class="search-locations__list__item locationsClickFunction selected" data-id=${selectedLocation.id}>${selectedLocation.name}</span>`
      );
    }

    $(".search-container-body__form__result").html(searchResult);
  }
  $("#landmark-modal").on(
    "click",
    ".locationsClickFunction",
    "filter-search-dropdown-option",
    function (e) {
      $targetedElement = $(e.target);
      $id = e.target.getAttribute("data-id");
      $parentId = e.target.getAttribute("parent-id");
      $name = e.target.innerText;
      if (
        $targetedElement.hasClass("selected") &&
        !$targetedElement.hasClass("location-parent")
      ) {
        selectedLocations = selectedLocations.filter(
          (selectedLocation) => selectedLocation.id !== $id
        );
        $(`[data-id=${$id}]`).removeClass("selected");
        $(`[parent=${$parentId}]`).removeClass("selected");
      } else if (
        jQuery.inArray($id, selectedLocations) === -1 &&
        !$targetedElement.hasClass("location-parent")
      ) {
        pushSelectedLocations($id, $parentId, $name);
        $selected = $(`[data-id=${$id}]`).addClass("selected");
      }
      innerHtml();
    }
  );

  /**
   * Add Search Location
   */

  $("#landmark-modal").on("click", "#addLocations", function (e) {
    $("#mCSB_1_container").html(searchResult);
    $("#landmark-modal").iziModal("close");
  });

  /**
   * Add Search Location
   */

  $("#landmark-modal").on("click", ".location-parent", function (e) {
    var parentId = e.target.getAttribute("parent");
    if (!$(e.target).hasClass("selected")) {
      $(e.target).addClass("selected");
      document.querySelectorAll(".locationsClickFunction").forEach((item) => {
        if (
          item.getAttribute("parent-id") == parentId &&
          !selectedLocations.find(
            (location) => location.id == item.getAttribute("data-id")
          )
        ) {
          $(`span[parent=${parentId}]`).addClass("selected");
          // console.log(jQuery.inArray(item.getAttribute("data-id"), selectedLocations.id) == -1,'bu');

          item.classList.add("selected");
          pushSelectedLocations(
            item.getAttribute("data-id"),
            item.getAttribute("parent-id"),
            item.innerText
          );
        }
      });
      const searchObject = selectedLocations.find(
        (location) => location.id == 11
      );
      console.log(searchObject);
    } else {
      $(e.target).removeClass("selected");
      document.querySelectorAll(".locationsClickFunction").forEach((item) => {
        if (
          item.getAttribute("parent-id") == parentId ||
          item.getAttribute("parent") == parentId
        ) {
          item.classList.remove("selected");
        }
      });
      selectedLocations = selectedLocations.filter(
        (selectedLocation) => selectedLocation.parentId !== parentId
      );
    }
    console.log(selectedLocations);
    $(e.target).hasClass("selected")
      ? innerHtml($(e.target).text(), parentId)
      : innerHtml();
    // console.log($(this)[0]);
    // $(this).closest("span").css({ color: "red", border: "2px solid red" });
  });

  /**
   * PAY announcement
   */
  $(".proposal-item__selected").hide();
  var amount = {
    premium: 0,
    promotion: 0,
    socialAds: 0,
    youtubeAds: 0,
    urgently: 0,
    total: 0,
  };
  function calculteTotal() {
    amount.total =
      parseFloat(amount.premium) +
      parseFloat(amount.promotion) +
      parseFloat(amount.socialAds) +
      parseFloat(amount.youtubeAds) +
      parseFloat(amount.urgently);
    $(".total").html(amount.total);
  }
  $(".addAds").on("click", function (e) {
    $(`.confirmed`).hide();
    var adsType = e.target.getAttribute("ads-type");
    var modalType = e.target.getAttribute("data-izimodal-open");
    console.log(adsType, modalType);
    var premium;
    var promotion;
    // change value

    $(modalType).on("change", `input[name=${adsType}]:checked`, function () {
      $(`button[ads-type$=${adsType}]`).show();

      switch (adsType) {
        case "services-pricing":
          premium = $(`input[name$=${adsType}]:checked`, `${modalType}`).val();
          $(`div[ads-type=${adsType}]`).html(
            `<span class="icon-check fs-20 m-r-4"></span> <span>${$(
              `input[name$=${adsType}]:checked`,
              `${modalType}`
            ).attr("text-value")}</span>`
          );

          break;
        case "term-service":
          promotion = $(
            `input[name$=${adsType}]:checked`,
            `${modalType}`
          ).val();
          $(`div[ads-type=${adsType}]`).html(
            `<span class="icon-check fs-20 m-r-4"></span>${$(
              `input[name$=${adsType}]:checked`,
              `${modalType}`
            ).attr("text-value")}`
          );

        default:
          break;
          z;
      }
    });

    // assign adds on modal

    $(modalType).on("click", ".adsConfirm", function (e) {
      var assignAdsTypeButton = e.target.getAttribute("ads-type");
      console.log(assignAdsTypeButton, "aaaaa");
      switch (assignAdsTypeButton) {
        case "services-pricing":
          amount.premium = premium;
          $(`button[ads-type$=${assignAdsTypeButton}]`).hide();
          $(`div[ads-type$=${assignAdsTypeButton}]`).show();

          break;
        case "term-service":
          amount.promotion = promotion;
          $(`button[ads-type$=${assignAdsTypeButton}]`).hide();
          $(`div[ads-type$=${assignAdsTypeButton}]`).show();
        default:
          break;
      }
      calculteTotal();
    });
  });
  // assign adds without modal
  $(".adsConfirm").on("click", function (e) {
    var assignAdsTypeButton = e.target.getAttribute("ads-type");
    console.log(assignAdsTypeButton, "aaaaa");
    switch (assignAdsTypeButton) {
      case "social":
        amount.socialAds = $(this).attr("data-price");
        $(`div[ads-type=${assignAdsTypeButton}]`).html(
          `<span class="icon-check fs-20 m-r-4"></span>${$(
            `button[ads-type=${assignAdsTypeButton}]`
          ).attr("text-value")}`
        );
        $(`button[ads-type=${assignAdsTypeButton}]`).hide();
        $(`div[ads-type$=${assignAdsTypeButton}]`).show();
        break;
      case "youtube":
        amount.youtubeAds = $(this).attr("data-price");
        $(`div[ads-type=${assignAdsTypeButton}]`).html(
          `<span class="icon-check fs-20 m-r-4"></span>${$(
            `button[ads-type=${assignAdsTypeButton}]`
          ).attr("text-value")}`
        );
        $(`button[ads-type=${assignAdsTypeButton}]`).hide();
        $(`div[ads-type$=${assignAdsTypeButton}]`).show();
        break;
      case "urgent":
        amount.urgently = $(this).attr("data-price");
        $(`div[ads-type=${assignAdsTypeButton}]`).html(
          `<span class="icon-check fs-20 m-r-4"></span>${$(
            `button[ads-type=${assignAdsTypeButton}]`
          ).attr("text-value")}`
        );
        $(`button[ads-type=${assignAdsTypeButton}]`).hide();
        $(`div[ads-type$=${assignAdsTypeButton}]`).show();
        break;
      default:
        break;
    }
    calculteTotal();
  });
  /**
   * DELETE announcement
   */

  $(".proposal-item__selected").on("click", function (e) {
    var adsType = e.target.getAttribute("ads-type");
    $(".modal")
      .find("input:radio, input:checkbox")
      .prop("checked", false)
      .prop("selected", false);
    switch (adsType) {
      case "services-pricing":
        amount.premium = 0;
        calculteTotal();

        $(`button[ads-type=${adsType}]`).show();
        $(`div[ads-type$=${adsType}]`).hide();
        break;
      case "term-service":
        amount.promotion = 0;
        calculteTotal();
        $(`button[ads-type=${adsType}]`).show();
        $(`div[ads-type$=${adsType}]`).hide();

        break;

      case "social":
        amount.socialAds = 0;
        calculteTotal();
        $(`button[ads-type=${adsType}]`).show();
        $(`div[ads-type$=${adsType}]`).hide();

        break;
      case "youtube":
        amount.youtubeAds = 0;
        calculteTotal();
        $(`button[ads-type=${adsType}]`).show();
        $(`div[ads-type$=${adsType}]`).hide();

        break;
      case "urgent":
        amount.urgently = 0;
        calculteTotal();
        $(`button[ads-type=${adsType}]`).show();
        $(`div[ads-type$=${adsType}]`).hide();

        break;
      default:
        break;
    }
  });
  /**
   * Search and reset
   */
  var getNavigationLink = "search-container-tab-content-region";
  changeTabAndSearch();

  $("#landmark-modal").on(
    "click",
    ".search-container-header__navigation__link",
    function (e) {
      getNavigationLink = e.currentTarget.id;
      console.log(getNavigationLink);
      changeTabAndSearch();
    }
  );
  // reset input on searhRegion
  $("#landmark-modal").on("click", ".icon-trash", function () {
    $(".input-wrapper").find("input:text").val("");
    var inputVal = $(".input-wrapper").find("input:text").val();
    if (inputVal.length == 0) {
      $(".filter-search-dropdown").removeClass("filter-search-dropdown--open");
    }
    $(".searchRegion").removeClass("icon-trash").addClass("icon-search");
  });

  function changeTabAndSearch() {
    $("#landmark-modal").on("keyup", `#${getNavigationLink}`, function () {
      // icon change
      $(".searchRegion").removeClass("icon-search").addClass("icon-trash");

      var value = $(this).val().toLowerCase();
      //bosaltmaq ucun
      $(".filter-search-dropdown-holder").html("");
      var showDropdown = $(
        `div[data-tab=${getNavigationLink}] div[class=filter-search-dropdown]`
      );
      $(
        `div[data-tab=${getNavigationLink}] span[class$=locationsClickFunction]`
      ).each(function (_, obj) {
        console.log(this);
        if ($(this).attr("specialSearch") === "specialSearch") {
          if ($(this).text().toLowerCase().indexOf(value) > -1) {
            $(".filter-search-dropdown-holder").append(
              `<span class="filter-search-dropdown-option ${
                $(this).hasClass("location-parent")
                  ? "location-parent"
                  : "locationsClickFunction"
              } "  parent-id=${this.getAttribute(
                "parent-id"
              )} parent=${this.getAttribute(
                "parent"
              )} data-id=${this.getAttribute("data-id")}>${$(
                this
              ).text()}</span>`
            );
          }
        } else {
          if ($(this).text().toLowerCase().startsWith(value)) {
            $(".filter-search-dropdown-holder").append(
              `<span class="filter-search-dropdown-option ${
                $(this).hasClass("location-parent")
                  ? "location-parent"
                  : "locationsClickFunction"
              } "  parent-id=${this.getAttribute(
                "parent-id"
              )} parent=${this.getAttribute(
                "parent"
              )} data-id=${this.getAttribute("data-id")}>${$(
                this
              ).text()}</span>`
            );
          }
        }
      });
      if (value.length > 0) {
        showDropdown.addClass("filter-search-dropdown--open");
        // $(".input-icon").removeClass('icon-search').addClass('icon-remove')
      } else if (value.length == 0) {
        $(".filter-search-dropdown").removeClass(
          "filter-search-dropdown--open"
        );
        $(".searchRegion").removeClass("icon-trashh").addClass("icon-search");
      }
    });
  }
  $("#landmark-modal").on("click", ".resetSelectedRegion", function () {
    document.querySelectorAll(".locationsClickFunction").forEach((item) => {
      item.classList.remove("selected");
    });
    $(".search-container-body__form__result").html("");
    selectedLocations = [];
  });

  //Select dəyişməsinə uyğun inputların görünməsi
  $(".areaOfLand").hide();
  $(".forOffice").hide();
  $(".forMetro").hide();
  $(".forTarget").hide();
  $(".forResting").hide();

  function backToFirstView() {
    $(".floorLocation").show();
    $(".areaOfLand").hide();
    $(".forOffice").hide();
    $(".select-room").show();
    $(".floor").show();
    $(".numberOfFloors").show();
    $(".measure").html("(KVM)");
    $(".measureBox").show();
    $(".rent").show();
    $(".propertyDocument").show();
    $(".forResting").hide();

    // $("#reset-filter-search-form")
    //   .find(".searchCity")
    //   .prop("selectedIndex", 1)
    //   .trigger("change");
  }
  $(".changeSelectValue").on("change", function () {
    var selectedType = $(this).attr("select-type");
    var selectedValue = Number($(this).val());
    console.log(selectedValue, selectedType);
    var forSelect = $(this).attr("for-select");

    switch (selectedType) {
      //əmlak növü
      case "propertyType":
        if (selectedValue === 5) {
          $(".propertyType").show();
        } else {
          $(".propertyType")
            .find("input:radio, input:checkbox")
            .prop("checked", false)
            .prop("selected", false);
          $(".propertyType").hide();
        }

        break;
      case "advertisementType":
        if (selectedValue === 0) {
          $(".rentOrSale").show();
        } else {
          $(".rentOrSale")
            .find("input:radio, input:checkbox")
            .prop("checked", false)
            .prop("selected", false);
          $(".rentOrSale").hide();
          $(".creditSale").hide();
        }
        break;
      // home page
      case "propertyTypeForHP":
        // ✅ Həyət evi, Villa və
        // Bağ evi seçildikdə Mərtəbə dəyişib "Torpağın sahəsi(sot)" olmalıdır. Əlavə olaraqda Mərtəbə yerləşməsi silinsin.
        if (selectedValue === 2) {
          backToFirstView();
          $(".floorLocation").hide();
          $(".areaOfLand").show();
          return;
        }
        if (selectedValue === 3) {
          backToFirstView();

          $(".floorLocation").hide();
          $(".areaOfLand").show();
          return;
        }
        if (selectedValue === 4) {
          backToFirstView();

          $(".floorLocation").hide();
          $(".areaOfLand").show();
          return;
        }
        // Ofis seçildikdə Mərtəbə yerləşməsi əvəzinə
        // "Tikilinin növü" və içində 4 seçim Biznes mərkəzi, Həyət evi/Villa, Yeni tikili, Köhnə tikili
        if (selectedValue === 5) {
          backToFirstView();
          $(".floorLocation").hide();
          $(".forOffice").show();
          return;
        }
        // // Qaraj-da Otaq sayı, Mərtəbə, Mərtəbə sayı, Mərtəbə yerləşməsi silinsin
        if (selectedValue === 6) {
          backToFirstView();
          $(".select-room").hide();
          $(".floor").hide();
          $(".numberOfFloors").hide();
          $(".floorLocation").hide();
          return;
        }
        // // - Torpaq seçildikdə SAHƏ (KVM): dəyişib olacaq SAHƏ (SOT):
        // // - Torpaq-da Otaq sayı, Mərtəbə, Mərtəbə sayı, Mərtəbə yerləşməsi itsin
        if (selectedValue === 7) {
          backToFirstView();
          $(".measure").html("(SOT)");
          $(".select-room").hide();
          $(".floor").hide();
          $(".numberOfFloors").hide();
          $(".floorLocation").hide();
          return;
        }
        // // Obyekt-də Mərtəbə Mərtəbə yerləşməsi itsin.
        if (selectedValue === 8) {
          backToFirstView();

          $(".floor").hide();
          $(".floorLocation").hide();
          return;
        }
        // // - İstirahət mərkəzini seçdikdə, Otaq sayı, Sahəsi, Mərtəbə, Mərtəbə sayı, Günlük/Aylıq icarə və çıxarış silinsin.
        // // - İstirahət mərkəzini seçdikdə Bütün şəhərlər avtomatik aktiv olunsun.
        if (selectedValue === 9) {
          backToFirstView();
          $(".select-room").hide();
          $(".measureBox").hide();
          $(".floor").hide();
          $(".numberOfFloors").hide();
          $(".rent").hide();
          $(".propertyDocument").hide();
          $(".floorLocation").hide();
          $(".forResting").show();
          $("#reset-filter-search-form")
            .find(".searchCity")
            .prop("selectedIndex", 0)
            .trigger("change");
          return;
        } else {
          backToFirstView();
        }
        break;

      case "creditSale":
        if ($(this).prop("checked") == true) {
          $(".creditSale").show();
        } else {
          $(".creditSale").hide();
          $(".creditSale")
            .find("input:text, input:password, input:file, textarea")
            .val("");
        }
        break;

      case "buttonForBaku":
        if (selectedValue == 1) {
          $(".buttonForBaku").show();
          $(".form-selected").show();
        } else {
          $(".buttonForBaku").hide();
          $(".form-selected").hide();
        }
        break;
      //////complexes page
      case "searchParameter":
        if (selectedValue == 1) {
          $(".forDistrict").show();
          $(".forMetro").hide();
          $(".forTarget").hide();
          // metro  and target reset
          $(".forMetro, .forTarget")
            .find("input:radio, input:checkbox")
            .prop("checked", false)
            .prop("selected", false);
          $(".forMetro, .forTarget")
            .find("input:text, input:password, input:file, textarea")
            .val("");
        } else if (selectedValue == 2) {
          $(".forMetro").show();
          $(".forDistrict").hide();
          $(".forTarget").hide();
          // district  and target reset
          $(".forDistrict, .forTarget")
            .find("input:radio, input:checkbox")
            .prop("checked", false)
            .prop("selected", false);
          $(".forDistrict, .forTarget")
            .find("input:text, input:password, input:file, textarea")
            .val("");
        } else if (selectedValue == 3) {
          $(".forTarget").show();
          $(".forDistrict").hide();
          $(".forMetro").hide();
          // district  and metro reset
          $(".forDistrict, .forMetro")
            .find("input:radio, input:checkbox")
            .prop("checked", false)
            .prop("selected", false);
          $(".forDistrict, .forMetro")
            .find("input:text, input:password, input:file, textarea")
            .val("");
        }
        break;
      default:
        break;
    }
  });
  //search select2
  $(".searchCity").select2();
  $(".plan-tab__item").on("click", function () {
    var selectedId = $(this).attr("id");
    $(".plan-tab__item").removeClass("active");
    $(this).addClass("active");
    $(".apartment-plan__item__container").hide();
    $(`.apartment-plan__item__container[data-tab=${selectedId}]`).show();
    if (selectedId == "all") {
      $(".apartment-plan__item__container").show();
    }
  });
  //add to favorite
  $(".card-bookmark").on("click", function () {
    $(this).toggleClass("selected");
  });
  /// complexx page
  $("#justAnInputBox1").on("focus", function () {
    // $(this).parent().parent().parent().addClass("disabled");
    $("#justAnInputBox2").val("");
    // console.log($(this).parent().parent())
  });

  // button add spinnner
  $("button").on("click", (e) => {
    let spinner = $(e.currentTarget).find("i");
    spinner.removeClass("d-none");
    setTimeout((_) => spinner.addClass("d-none"), 2000);
  });
})(jQuery);