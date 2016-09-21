<template>
    <div class="row">
        <!-- col -->
        <div class="col-xs-12 col-sm-3 col-md-4 col-lg-4">
            <h1 class="page-title txt-color-blueDark">

                <!-- PAGE HEADER -->
                <i class="fa-fw fa fa-home"></i>
                Page Header
                <span>>
				Subtitle
			</span>
            </h1>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <!-- widget grid -->
    <section id="widget-grid" class="">

        <!-- row -->
        <div class="row">

            <!-- NEW WIDGET START -->
            <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                <widget></widget>

            </article>
            <!-- WIDGET END -->

        </div>

        <!-- end row -->

        <!-- row -->

        <div class="row">

            <!-- a blank row to get started -->

        </div>

        <!-- end row -->

    </section>
    <!-- end widget grid -->

</template>
<script>

    import Widget from './Widget.vue'

    export default{
        components: {
            Widget
        },
        ready() {

        }
    }
</script>