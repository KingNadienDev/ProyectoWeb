//NADIEN DEV COPYRIGHT PROHIBIDO SU USO EXTERNO//
   $(document).ready(function () {
      $('.dropdown-submenu .dropdown-toggle').on("click", function (e) {
        // Cierra todos los submenús excepto el clicado
        $('.dropdown-submenu .dropdown-menu').not($(this).next()).slideUp();
        $(this).next('.dropdown-menu').slideToggle();
        e.preventDefault();
        e.stopPropagation();
      });

      // Cierra todos los submenús cuando se cierra el menú principal
      $('.dropdown').on('hide.bs.dropdown', function () {
        $('.dropdown-submenu .dropdown-menu').hide();
      });
    });