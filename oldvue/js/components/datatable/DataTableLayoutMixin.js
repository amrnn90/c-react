import { ResizeObserver } from "@/utils";

export default {
    methods: {
        layTable: _.throttle(function () {
            if (!this.$refs.table) return;

            const requiredWidths = this.resource.fields.reduce((acc, field) => {
                acc[field.name] = this.getColumnMaxWidth(field.name);
                return acc;
            }, {});

            const adjustedWidths = this.getAdjustedWidths(requiredWidths);

            this.hiddenColumns = Object.keys(adjustedWidths).filter(
                column => adjustedWidths[column] == 0
            );

            this.$nextTick(() => {
                this.setColumnsWidths(adjustedWidths);
                // this.isLoading = false;
            });
        }, 150, {trailing: true}),
        getColumnMaxWidth(column) {
            const table = this.$refs.table;

            const cells = table.querySelectorAll(`.cell-${column}`);

            return Math.max(
                ...Array.prototype.map.call(cells, cell => this.getCellAutoWidth(cell))
            );
        },
        getCellAutoWidth(cell) {
            const clone = cell.cloneNode(true);

            clone.style.display = "inline-block";
            clone.style.visibility = "hidden";
            clone.style.width = "auto";
            document.body.appendChild(clone);

            const width = clone.offsetWidth;

            clone.remove();

            return width;
        },
        getAdjustedWidths(requiredWidths) {
            const widths = { ...requiredWidths };

            const availableWidth =
                this.$refs.table.querySelector(".table-cells").offsetWidth - 50;

            let visibleFields = this.resource.fields.filter(
                field => widths[field.name] != 0
            );
            let totalWidth = Object.values(widths).reduce(
                (total, current) => total + current
            );

            while (totalWidth > availableWidth && visibleFields.length > 1) {
                const lowestPriorityColumn =
                    visibleFields[visibleFields.length - 1].name;
                widths[lowestPriorityColumn] = 0;
                totalWidth = Object.values(widths).reduce(
                    (total, current) => total + current
                );
                visibleFields = this.resource.fields.filter(
                    field => widths[field.name] != 0
                );
            }
            return widths;
        },
        setColumnsWidths(widths) {
            const table = this.$refs.table;
            Object.keys(widths).forEach(column => {
                const cells = table.querySelectorAll(`.cell-${column}`);
                cells.forEach(cell => {
                    cell.style.width = `${widths[column]}px`;
                    if (widths[column] == 0) {
                        cell.style.display = "none";
                    } else {
                        cell.style.removeProperty("display");
                    }
                });
            });
        }
    },
    mounted() {
        this.resizeObserver = new ResizeObserver((entries, observer) => {
            this.$nextTick(() => {
                this.layTable();
            });
        });

        this.resizeObserver.observe(this.$refs.table);
    },
    destroyed() {
        this.resizeObserver.disconnect();
    }
}